import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { colors } from '../../utils/style';
import moment from 'moment';


export default function Message(props) {
    return (
        <View style={[s.box, {flexDirection: props.side == 'left' ? 'row':'row-reverse'}]}>
            <View style={[s.msgBox, {backgroundColor: props.side == 'left' ? colors.darkMain:'gray'}]}>
                <Text style={[s.msg]}>{props.msg}</Text>
            </View>
            <Text style={{color: 'gray', padding: 2, fontSize: 13}}>{moment(props.date).startOf().fromNow()}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    box: {
        padding: 3,
        alignItems: 'flex-end'
    },
    msgBox: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15
    },
    msg: {
        color: colors.text,
        fontSize: 18
    }
})