import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { colors } from '../../../utils/style';

export default function UserIndicators(props) {
    return (
        <View style={s.achievement}>
            <View style={{...s.achiveBox, ...s.rightBorder}}>
                <Text style={s.number}>{props.followers.length}</Text>
                <Text style={s.type}>Followers</Text>
            </View>
            <View style={[s.achiveBox, s.rightBorder, {alignSelf: 'flex-start'}]}>
                <Text style={s.username}>{props.username}</Text>
            </View>
            <View style={{...s.achiveBox, ...s.rightBorder}}>
                <Text style={s.number}>{props.following.length}</Text>
                <Text style={s.type}>Following</Text>
            </View>
            {/* <View style={s.achiveBox}>
                <Text style={s.number}>{props.achievements.cash || 0}$</Text>
                <Text style={s.type}>Dollars</Text>
            </View> */}
        </View>
    )
}

const s = StyleSheet.create({
    achievement: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    achiveBox: {
      alignItems: "center",
      paddingHorizontal: 35,
    },
    number: {
      color: colors.text,
      fontWeight: 'bold'
    },  
    type: {
      color: colors.text
    },
    username: {
        color: colors.text,
        fontWeight: 'bold',
        letterSpacing: 1
    }
  });