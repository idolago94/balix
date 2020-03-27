import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, ScrollView  } from 'react-native';
import Routes from '../../../Routes/Routes';
import bufferToBase64 from '../../../helpers/convert/Buffer';
import SmallPhoto from './SmallPhoto';
import style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import { window_width } from '../../../utils/view';

export default function Photos(props) {

    let extra = [];
    for(let i=0; i < props.amount-props.data.length; i++) {
        extra.push('');
    }
    let extraOptions = [2,4,6];
    return (
        <ScrollView>
            <View style={s.container}>
                {props.data.map((img, i) => (<SmallPhoto key={i} data={img} onPress={(params) => props.onPhoto(params)} />))}
                {props.isMy && extra.map((e, i) => (
                <View key={i} style={s.imageBox}>
                    <TouchableHighlight style={s.touchable} onPress={() => props.toAdd()}>
                        <Icon name={iconNames.PLUS} color={'lightgray'} size={50} />
                    </TouchableHighlight>
                </View>
                ))}
                {props.showExtra && extraOptions.map((cost, i) => (
                <View key={i} style={[s.imageBox, {opacity: 1}]}>
                    <TouchableHighlight style={s.touchable} onPress={() => props.onPressExtra(cost, i+1)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: style.colors.text, fontSize: 35}}>{cost}</Text>
                            <Icon name={iconNames.DOLLAR} color={style.colors.text} size={30} />
                        </View>
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
        width: window_width
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
