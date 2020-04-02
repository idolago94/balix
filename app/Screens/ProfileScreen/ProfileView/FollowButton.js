import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import { colors } from '../../../utils/style';

export default function FollowButton(props) {
    return (
        <TouchableHighlight style={[props.style, {flexGrow: 1,  margin: 5, width: '50%'}]} onPress={() => props.onPress()} >
            <View style={{...s.button, borderColor: (props.follow) ? (colors.lightMain):(colors.text)}}>
                <Icon size={15} name={iconNames.FOLLOW} color={(props.follow) ? (colors.lightMain):(colors.text)} />
                <Text style={{color: (props.follow) ? (colors.lightMain):(colors.text), marginLeft: 7}}>{(props.follow) ? ('STOP'):('START')} FOLLOW</Text>
            </View>
      </TouchableHighlight>
    )
}

const s = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
  },
  });