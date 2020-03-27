import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import Routes from '../../../Routes/Routes';
import FollowButton from './FollowButton';
import UserIndicators from './UserIndicators';

export default function UserDetails(props) {

    return (
      <View style={styles.userDetails}>
        <UserIndicators username={props.user.username} followers={props.user.followers} following={props.user.following} achievements={{cash: props.user.cash_earned || 0}} />
        <View style={styles.imageBox}>
          <ProfileSymbol
            iconPress={(props.isMy) ? (() => props.onNavigate(Routes.Screens.CAMERA.routeName, {story_live: 'live'})) : (() => props.onNavigate(Routes.Screens.CONVERSATION.routeName))}
            src={props.user.profileImage}
            icon={(props.isMy) ? (iconNames.LIVE) : (iconNames.LETTER)}
            size={220}
            iconSize={20}
            iconDeg={273}
          />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  userDetails: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  name: {
    color: Style.colors.text,
    paddingVertical: 7,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },

  buttonBox: {
    alignItems: 'center',
    margin: 10
  },
  extraButton: {
    width: '70%',
    borderRadius: 5,
    borderColor: Style.colors.text,
    borderWidth: 1,
    alignItems: 'center'
  },
  buttonContent: {
    color: Style.colors.text,
    paddingVertical: 8
  }
});