import React, { Component } from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon/Icon';
import { colors } from '../../utils/style';

export default function IconButton(props) {
    return (
        <TouchableHighlight onPress={() => props.onPress()} style={props.style}>
            <Icon name={props.icon} color={props.color || colors.icon} size={props.size} />
        </TouchableHighlight>
    )
}