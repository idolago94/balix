import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileSymbol from '../../../../components/ProfileSymbol/ProfileSymbol';
import { colors } from '../../../../utils/style';

export default class Message extends Component {
    // Props = [ userSent, message, logged ]

  render() {
    return (
      <View style={{...styles.container, flexDirection: (this.props.logged) ? ('row'):('row-reverse')}}>
          <ProfileSymbol src={this.props.userSent.profileImage} size={40} style={{margin: 5}} />
          <View style={{borderRadius: 10, padding: 10, backgroundColor: (this.props.logged) ? (colors.lightMain):('gray')}}>
              <Text style={{color: colors.text}}>{this.props.message}</Text>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    margin: 5
  }
});
