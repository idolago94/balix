import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import Routes from '../../../Routes/Routes';

export default function UserDetails(props) {

    return (
      <View>
        <View style={styles.userDetails}>
          <View style={styles.user}>
            <View style={styles.imageBox}>
              <ProfileSymbol
                iconPress={(props.isMy) ? (() => props.onNavigate(Routes.Screens.CAMERA.routeName, {story_live: 'live'})) : (() => props.onNavigate(Routes.Screens.CONVERSATION.routeName))}
                src={props.user.profileImage}
                icon={(props.isMy) ? (iconNames.LIVE) : (iconNames.LETTER)}
                size={100}
              />
              {!props.isMy && (
                <TouchableHighlight onPress={() => props.followPress()} >
                  <View style={{...styles.followButton, borderColor: (props.follow) ? (Style.colors.lightMain):(Style.colors.text)}}>
                    <Icon size={15} name={iconNames.FOLLOW} color={(props.follow) ? (Style.colors.lightMain):(Style.colors.text)} />
                    <Text style={{color: (props.follow) ? (Style.colors.lightMain):(Style.colors.text), marginLeft: 7}}>{(props.follow) ? ('STOP'):('START')} FOLLOW</Text>
                  </View>
                </TouchableHighlight>
              )}
            </View>
            <Text style={styles.name}>{props.user.username}</Text>
          </View>
          <View style={styles.achievement}>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{props.user.followers.length}</Text>
              <Text style={styles.type}>Followers</Text>
            </View>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{props.user.following.length}</Text>
              <Text style={styles.type}>Following</Text>
            </View>
            <View style={styles.achiveBox}>
              <Text style={styles.number}>{props.user.cash}$</Text>
              <Text style={styles.type}>Dollars</Text>
            </View>
          </View>
        </View>
        {props.isMy && (
          <View style={styles.buttonBox}>
              <View style={styles.extraButton}>
                  <Text style={styles.buttonContent}>Extra Photo</Text>
              </View>
          </View>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  userDetails: {
    justifyContent: 'center',
    marginVertical: 10
  },

  user: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: Style.colors.text,
    paddingVertical: 7,
    fontWeight: 'bold'
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  achievement: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  achiveBox: {
    alignItems: "center",
    paddingHorizontal: 35,

  },
  rightBorder: {
    borderRightColor: 'white',
    borderRightWidth: 1
  },
  number: {
    color: Style.colors.text,
    fontWeight: 'bold'
  },
  type: {
    color: Style.colors.text
  },

  buttonBox: {
    alignItems: 'center',
    margin: 10
  },
  extraButton: {
    width: '70%',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center'
  },
  buttonContent: {
    color: Style.colors.text,
    paddingVertical: 8
  }
});