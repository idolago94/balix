import React, { useRef } from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from '../Icon/Icon';
import { colors } from '../../utils/style';

export default function IconButton(props) {
    const buttonRef = useRef(null);
    return (
        <TouchableHighlight onPress={() => props.onPress(buttonRef.current)} style={[props.style, {alignItems: 'center', justifyContent: 'center'}]}>
            <Icon ref={buttonRef} name={props.icon} color={props.color || colors.icon} size={props.size} />
        </TouchableHighlight>
    )
}