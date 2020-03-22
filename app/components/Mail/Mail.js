import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Conversation from './Conversation';
import Style from '../../helpers/style/style';
import { inject, observer } from "mobx-react";

@inject('AuthStore')
export default class Mail extends Component {

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.AuthStore.getUserLogin.conversations.map((conv, i) => (
            <Conversation key={i} {...this.props.navigation} userLogin={this.props.AuthStore.getUserLogin} conversationId={conv} />
          ))
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
