import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import Routes from '../../utils/Routes';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';
import ApiService from '../../Services/Api';
import { window_width } from '../../utils/view';
import moment from 'moment';

@inject('AuthStore', 'UsersStore', 'NavigationStore', 'ChatStore')
@observer
export default class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            talkWith: []
        }
    }

    async componentDidMount() {
        const {AuthStore, UsersStore} = this.props;
        let participants = this.props.data.participants;
        let users = [];
        for(let i=0; i<participants.length; i++) {
            if(AuthStore.getUserLogin._id != participants[i]) {
                let user = UsersStore.getUserById(participants[i]);
                if(!user) {
                    user = await ApiService.getUser(participants[i]);
                    UsersStore.setUsers([user]);
                }
                users.push(user);
            }
        }
        this.setState({talkWith: users});
    }

    render() {
        let hasNew = this.props.ChatStore.roomHasNew(this.props.data._id, this.props.data.last_message);
        return (
            <TouchableHighlight onPress={() => this.props.NavigationStore.navigate(Routes.Screens.CHAT_ROOM.routeName, {room: this.props.data, user: this.state.talkWith})}>
                <View style={s.container}>
                    <View style={{width: window_width*0.2, alignItems: 'center'}}>
                        {this.state.talkWith.map((user, i) => (
                            <ProfileSymbol 
                                key={i}
                                style={{position: 'absolute', top: i*10, left: i*10, transform: [{translateX: '-25%'}, {translateY: '-25%'}]}}
                                src={user.profileImage}
                                size={60}
                            />
                        ))}
                    </View>
                    <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
                        <Text style={[s.username, {color: hasNew ? 'red':colors.text}]}>{this.state.talkWith.map(u => u.username).join(', ')}</Text>
                        <Text style={s.date}>{moment(this.props.data.last_message).startOf().fromNow()}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}


const s = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        padding: 10,
        paddingBottom: 30,
        alignItems: 'center'
    },
    username: {
        color: colors.text,
        fontWeight: 'bold'
    },
    date: {
        color: colors.text
    }
});
