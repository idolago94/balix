import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert, SafeAreaView} from 'react-native';
import {colors} from '../../utils/style';
import Icon from '../Icon/Icon';

export default function DrawerTab(props) {
    return (
        <TouchableHighlight onPress={() => props.onPress()}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                <Icon style={{paddingRight: 10}} name={props.icon} size={20} color={colors.text} />
                <Text style={s.title}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const s = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 18
    }
})