import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import Style from '../../helpers/style/style';

class Mail extends Component {

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.userLogin.conversations.map((conv, i) => (
            <Conversation key={i} {...this.props.navigation} userLogin={this.props.userLogin} conversationId={conv} />
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

const mapStateToProps = (state) => {
  return {
    userLogin: state.auth.userLogin
  }
};

export default connect(mapStateToProps)(Mail);
