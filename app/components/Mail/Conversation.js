import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import userService from '../../demoDB/Users/userService';
import messageService from '../../demoDB/Messages/messageService';
import ProfileSymbol from '../ProfileSymbol/ProfileSymbol';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';

export default class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: undefined,
            talkWith: undefined
        }
    }

    componentDidMount() {
        let messages = messageService.getConversationMessages(this.props.conversationId);
        let talkWith = (messages[0].senderId == this.props.userLogin._id) ? (messages[0].receiverId) : (messages[0].senderId);
        talkWith = userService.getUserById(talkWith);
        this.setState({
            messages: messages,
            talkWith: talkWith
        })
    }

  render() {
    return (
        (this.state.messages && this.state.talkWith) ?
        (
        <TouchableHighlight onPress={() => this.props.navigate(Routes.Screens.CONVERSATION.routeName, {
            conversationData: { userLogin: this.props.userLogin, messages: this.state.messages, talkWith: this.state.talkWith }
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
        color: Style.colors.text
    },
    action: {
        color: Style.colors.text
    }
});
