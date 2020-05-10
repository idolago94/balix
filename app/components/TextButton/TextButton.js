import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function TextButton(props) {
  const buttonRef = useRef(null);

  return (
    <TouchableHighlight ref={buttonRef} style={styles.button} onPress={() => props.onPress(buttonRef.current)}>
        <Text style={{color: props.color || colors.text, textAlign: 'center'}}>{props.title}</Text>
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
    }
});
