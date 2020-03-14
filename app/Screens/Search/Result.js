import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../helpers/style/style';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';

export default function Result(props) {

  return (
      <View style={styles.container}>
        <ProfileSymbol src={props.data.profileImage} size={50} style={{padding: 5}} />
        <View>
          <Text style={styles.name}>{props.data.username}</Text>
          <View style={styles.infoBox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: Style.colors.text}}>Following: {props.data.following.length},  </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: Style.colors.text}}>Followers: {props.data.followers.length}</Text>
            </View>
          </View>
        </View>
      </View>
  )
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
