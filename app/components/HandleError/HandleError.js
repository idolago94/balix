import React, { Component } from 'react';
import Style from '../../helpers/style/style';
import {StyleSheet, Text, View} from 'react-native';

export default function HandleError(props) {

    return (
        <View style={s.errorBox}>
            {props.data.map((err, i) => (
            <Text key={i} style={{color: Style.colors.text}}>* {err}</Text>
            ))}
        </View>
    )
}

const s = StyleSheet.create({
    errorBox: {
        borderRadius: Style.sizes.border_radius,
        borderWidth: 1,
        borderColor: Style.colors.errorBorder,
        width: '100%',
        padding: 10,
        backgroundColor: Style.colors.errorBackground
    }
  });