import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { iconNames } from '../../../components/Icon/Icon';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import Routes from '../../../utils/Routes';
import UserIndicators from './UserIndicators';
import { colors } from '../../../utils/style';

export default function UserDetails(props) {

    return (
      <View style={styles.userDetails}>
        <UserIndicators username={props.user.username} followers={props.user.followers} following={props.user.following} achievements={{cash: props.user.cash_earned || 0}} />
        <View style={styles.imageBox}>
          <ProfileSymbol
            iconPress={() => props.isMy ? props.toLive():props.toChat()}
            src={props.user.profileImage}
            icon={(props.isMy) ? (iconNames.LIVE) : (iconNames.LETTER)}
            iconStyle={{backgroundColor: colors.text, borderColor: colors.background, borderWidth: 2}}
            iconColor={colors.background}
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
    color: colors.text,
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
    borderColor: colors.text,
    borderWidth: 1,
    alignItems: 'center'
  },
  buttonContent: {
    color: colors.text,
    paddingVertical: 8
  }
});