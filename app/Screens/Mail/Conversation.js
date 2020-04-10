import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import Routes from '../../utils/Routes';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';

@inject('AuthStore', 'NavigationStore')
export default class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: undefined,
            talkWith: undefined
        }
    }

    // componentDidMount() {
    //     let messages = messageService.getConversationMessages(this.props.conversationId);
    //     let talkWith = (messages[0].senderId == this.props.AuthStore.getUserLogin._id) ? (messages[0].receiverId) : (messages[0].senderId);
    //     talkWith = userService.getUserById(talkWith);
    //     this.setState({
    //         messages: messages,
    //         talkWith: talkWith
    //     })
    // }

  render() {
    return (
        (this.state.messages && this.state.talkWith) ?
        (
        <TouchableHighlight onPress={() => this.props.NavigationStore.navigate(Routes.Screens.CONVERSATION.routeName, {
            conversationData: { userLogin: this.props.AuthStore.getUserLogin, messages: this.state.messages, talkWith: this.state.talkWith }
        })}>
        <View style={styles.container}>
            <ProfileSymbol src={this.state.talkWith.profileImage} size={40} style={{margin: 5}} />
            <View style={styles.content}>
                <Text style={styles.name}>{this.state.talkWith.userName}</Text>
                <Text style={styles.action}>active 2 hours ago.</Text>
            </View>
        </View>
        </TouchableHighlight>
        ) : (<View></View>)
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontWeight: 'bold',
        color: colors.text
    },
    action: {
        color: colors.text
    }
});
