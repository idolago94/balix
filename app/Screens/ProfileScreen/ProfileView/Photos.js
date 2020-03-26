import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, ScrollView  } from 'react-native';
import Routes from '../../../Routes/Routes';
import bufferToBase64 from '../../../helpers/convert/Buffer';
import SmallPhoto from './SmallPhoto';
import style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';

export default function Photos(props) {

    let extra = [];
    for(let i=0; i < 9-props.data.length; i++) {
        extra.push('');
    }
    return (
        <ScrollView>
            <View style={s.container}>
                {props.data.map((img, i) => (<SmallPhoto key={i} data={img} onPress={(params) => props.onPhoto(params)} />))}
                {props.isMy && extra.map(() => (
                <View style={s.imageBox}>
                    <TouchableHighlight style={s.touchable} onPress={() => props.toAdd()}>
                        <Icon name={iconNames.PLUS} color={'lightgray'} size={50} />
                    </TouchableHighlight>
                </View>
                ))}
            </View>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
        width: '100%'
    },
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: style.colors.text,
        borderRadius: 10,
        opacity: 0.35
    },
    touchable: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});
