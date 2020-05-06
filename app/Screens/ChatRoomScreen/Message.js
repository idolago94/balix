import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../utils/style';


export default function Message(props) {
    return (
        <View style={[s.box, {flexDirection: props.side == 'left' ? 'row':'row-reverse'}]}>
            <View style={[s.msgBox, {backgroundColor: props.side == 'left' ? colors.lightMain:'gray'}]}>
                <Text style={[s.msg]}>{props.msg}</Text>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    box: {
        padding: 3
    },
    msgBox: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15
    },
    msg: {
        color: colors.text,
        fontSize: 20
    }
})