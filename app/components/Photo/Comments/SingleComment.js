import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils/style';
import { inject, observer } from "mobx-react";
import ProfileSymbol from '../../ProfileSymbol/ProfileSymbol';
import ApiService from '../../../Services/Api';

@inject('UsersStore')
@observer
export default class SingleComment extends Component {
    
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const {UsersStore, comment} = this.props;
        let sender = UsersStore.getUserById(comment.sender_id);
        if(!sender) {
            sender = await ApiService.getUser(comment.sender_id);
            UsersStore.setUsers([sender]);
        }
    }

    render() {
        const {UsersStore, comment} = this.props;
        const sender = UsersStore.getUserById(comment.sender_id);
        return (
            <View style={s.container}>
                {sender && <ProfileSymbol 
                    style={{paddingRight: 5}}
                    src={sender.profileImage}
                    size={40}
                />}
                <View>
                    {sender && <Text style={s.name}>{sender.username}</Text>}
                    <Text style={s.content}>{this.props.comment.data}</Text>
                </View>
            </View>
        );
    }
}

const s = StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 5
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 16,
    }
});
