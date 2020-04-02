import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors, sizes } from '../../utils/style';

export default function HandleError(props) {

    return (
        <View style={s.errorBox}>
            {props.data.map((err, i) => (
            <Text key={i} style={{color: colors.text}}>* {err}</Text>
            ))}
        </View>
    )
}

const s = StyleSheet.create({
    errorBox: {
        borderRadius: sizes.border_radius,
        borderWidth: 1,
        borderColor: colors.errorBorder,
        width: '100%',
        padding: 10,
        backgroundColor: colors.errorBackground
    }
  });