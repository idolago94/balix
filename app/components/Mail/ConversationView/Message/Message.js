import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { backgroundColor, Style.colors.text, Style.colors.lightMain } from '../../../../../common/style';
import Style from '../../../../helpers/style/style';
import ProfileSymbol from '../../../ProfileSymbol/ProfileSymbol';

export default class Message extends Component {
    // Props = [ userSent, message, logged ]

  render() {
    return (
      <View style={{...styles.container, flexDirection: (this.props.logged) ? ('row'):('row-reverse')}}>
          <ProfileSymbol src={this.props.userSent.profileImage} size={40} style={{margin: 5}} />
          <View style={{borderRadius: 10, padding: 10, backgroundColor: (this.props.logged) ? (Style.colors.lightMain):('gray')}}>
              <Text style={{color: Style.colors.text}}>{this.props.message}</Text>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.colors.background,
    margin: 5
  }
});
