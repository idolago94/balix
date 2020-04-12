import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function ModalButton(props) {

  return (
    <TouchableHighlight style={[s.button, {backgroundColor: props.color}]} onPress={() => props.onPress()}>
        <Text style={[s.text, {color: props.textColor || colors.text}]}>{props.title}</Text>
    </TouchableHighlight>
  )
}


const s = StyleSheet.create({
    button: {
        borderRadius: 5
    },
    text: {
        padding: 7,
        fontWeight: 'bold',
    },
});
