import React, { Component } from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon/Icon';
import style from '../../helpers/style/style';

export default function IconButton(props) {
    return (
        <TouchableHighlight onPress={() => props.onPress()} style={props.style}>
            <Icon name={props.icon} color={props.color || style.colors.icon} size={props.size} />
        </TouchableHighlight>
    )
}