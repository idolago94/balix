import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function TextButton(props) {

  return (
    <TouchableHighlight style={styles.setButton} onPress={() => props.onPress()}>
        <Text style={styles.setText}>{props.content}</Text>
    </TouchableHighlight>
  )
}


const styles = StyleSheet.create({
    setButton: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.formField,
        borderRadius: sizes.border_radius,
        padding: 15,
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    setText: {
        color: colors.text
    },
});
