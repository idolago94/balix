import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { window_width, window_height } from '../../utils/view';
import Slider from '@react-native-community/slider';
import { colors } from '../../utils/style';

export default function Modal(props) {
    return (
        <View style={[s.container]}>
            <View style={s.modalBox}>
                {props.content}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        width: window_width,
        height: window_height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBox: {
        minHeight: window_height*0.2,
        minWidth: window_width*0.7,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export const rangeModal = (title, confirmCallback, cancelCallback) => {
    return (
        <View style={{}}>
            <Text style={{margin: 10, color: colors.text, fontSize: 20, borderBottomwidth: 1, borderBottomColor: 'lightgray'}}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
                <Slider
                    style={{margin: 10, flexGrow: 1}}
                    minimumValue={1}
                    maximumValue={200}
                    minimumTrackTintColor={colors.lightMain}
                    maximumTrackTintColor={colors.text}
                    value={value}
                />
                <Text style={{color: colors.lightMain, fontSize: 20}}>{value}</Text>
            </View>
        </View>
    )
}