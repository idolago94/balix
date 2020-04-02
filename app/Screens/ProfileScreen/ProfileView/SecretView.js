import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, ScrollView  } from 'react-native';
import SmallPhoto from './SmallPhoto';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import { window_width } from '../../../utils/view';
import IconButton from '../../../components/IconButton/IconButton';
import { colors } from '../../../utils/style';

export default function SecretView(props) {
    let morePhotos = [];
    for(let i=0; i < 9-props.data.length; i++) {
        morePhotos.push('');
    }
    return (
        <ScrollView>
            <View style={s.container}>
                {props.data.map((img, i) => (<SmallPhoto isMy={props.isMy} secret={true} key={i} data={img} onPress={(params) => props.onPhoto(params)} />))}
                {props.isMy && morePhotos.map((e, i) => (
                <View key={i} style={s.imageBox}>
                    <IconButton style={s.touchable} onPress={() => props.toAdd()} icon={iconNames.PLUS} color={'lightgray'} size={50} />
                    <View style={{position: 'absolute', bottom: -3, right: -3, borderRadius: 5, backgroundColor: colors.text}}>
                        <Icon name={iconNames.LOCK} color={colors.background} size={18} style={{padding: 3}} />
                    </View>
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
        width: window_width
    },
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.text,
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
