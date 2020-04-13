import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import { colors } from '../../../utils/style';

export default function DeleteIndicator(props) {
    return (
        <View style={s.indicator}>
            <Icon name={iconNames.TRASH} size={40} color={colors.icon} />
        </View>
    )
}

const s = StyleSheet.create({
    indicator: {
        position: 'absolute', 
        bottom: 0, 
        right: 0, 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});