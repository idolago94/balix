import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Conversation from './Conversation';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';

@inject('AuthStore')
export default class Mail extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 20}}>Mail Screen</Text>
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
    backgroundColor: colors.background,
  }
});
