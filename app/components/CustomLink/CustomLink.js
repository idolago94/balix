import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function CustomLink(props) {

  return (
    <TouchableHighlight style={[{alignSelf: 'flex-start'}, props.style]} onPress={() => props.onPress()}>
        <Text style={{
          color: props.color || 'gray', 
          fontSize: props.size || 13, 
          textDecorationLine: 'underline',
          margin: 2
          }}>{props.title}</Text>
    </TouchableHighlight>
  )
}
