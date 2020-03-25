import React, { Component } from 'react';
// Components
import {Text, TouchableHighlight} from 'react-native';

export default function FooterButton(props) {
    return (
        <TouchableHighlight style={{padding: 20}} onPress={() => props.onPress()}>
            <Text style={{color: 'gray', fontSize: 15}}>{props.title}</Text>
        </TouchableHighlight>
    );
}
