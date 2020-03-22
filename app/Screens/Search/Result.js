import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../helpers/style/style';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import { inject, observer } from 'mobx-react';

@inject('UsersStore')
@observer
export default class Result extends Component {

  render() {
    const userData = this.props.UsersStore.getUserById(this.props.id);
    return (
      <View style={styles.container}>
        <ProfileSymbol src={userData.profileImage} size={50} style={{padding: 5}} />
        <View>
          <Text style={styles.name}>{userData.username}</Text>
          <View style={styles.infoBox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: Style.colors.text}}>Following: {userData.following.length},  </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: Style.colors.text}}>Followers: {userData.followers.length}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: Style.colors.text,
        fontWeight: 'bold'
    },
    infoBox: {
        flexDirection: 'row',
        padding: 5
    }
});
