import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function TextButton(props) {

  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onPress()}>
        <Text style={styles.text}>{props.content}</Text>
    </TouchableHighlight>
  )
}


const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.formField,
        borderRadius: sizes.border_radius,
        padding: 15,
        paddingHorizontal: 40,
        alignItems: 'center' 
    },
    text: {
        color: colors.text
    },
});
