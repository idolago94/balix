import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from '../../../components/Icon/Icon';
import { colors } from '../../../utils/style';

export default function ProfileButton(props) {
    return (
        <TouchableHighlight style={[props.style, {flexGrow: 1,  margin: 5, borderRadius: 5, width: '50%'}]} onPress={() => props.onPress()} >
            <View style={[s.button, {borderColor: colors.text}]}>
                {props.icon && <Icon size={15} name={props.icon} color={props.style.backgroundColor == colors.text ? (colors.background):(colors.text)} />}
                <Text style={{color: props.style.backgroundColor == colors.text ? (colors.background):(colors.text), marginLeft: 7}}>{props.title}</Text>
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