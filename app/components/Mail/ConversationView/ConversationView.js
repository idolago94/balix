import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../../helpers/style/style';
import Message from './Message/Message';


export default class ConversationView extends Component {
  // Params = [ userLogin, messages, talkWith ]

    constructor(props) {
        super(props);
        this.state = {
            userLogin: undefined,
            messages: []
        }
    }

    componentDidMount() {
        let convData = this.props.navigation.getParam('conversationData');
        this.setState({
            userLogin: convData.userLogin,
            messages: convData.messages,
            talkWith: convData.talkWith
        });
    }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.messages.map((msg, i) => {
                if(msg.senderId == this.state.userLogin._id) {
                    return (<Message logged={true} key={i} userSent={this.state.userLogin} message={msg.content} />)
                }
                return (<Message key={i} userSent={this.state.talkWith} message={msg.content} />)
            })
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
  }
});
