import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import style from '../../../helpers/style/style';

export default function SecretIndicatore(props) {
    return (
        <View style={s.indicator}>
            <Icon name={iconNames.VISIBLE} size={13} color={style.colors.background} />
            <Text style={s.number}>{props.views}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    indicator: {
        position: 'absolute', 
        bottom: -4, 
        right: -4, 
        alignItems: 'center', 
        backgroundColor: style.colors.text, 
        borderRadius: 5, 
        paddingHorizontal: 3,
        borderWidth: 2,
        borderColor: style.colors.background
    },
    number: {
        color: style.colors.background,
        fontSize: 10
    }
});