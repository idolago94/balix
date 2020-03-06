import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import Style from '../../helpers/style/style';

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
        borderColor: Style.colors.formField,
        borderRadius: Style.sizes.border_radius,
        padding: 15,
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    setText: {
        color: Style.colors.text
    },
});
