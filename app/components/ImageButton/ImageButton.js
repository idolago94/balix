import React, { useRef } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Animated } from 'react-native';

export default function ImageButton(props) {
    const buttonRef = useRef(null);
    return (
        <TouchableHighlight 
            ref={buttonRef}  
            style={props.style}
            onPress={() => props.onPress ? props.onPress(buttonRef.current):console.log('press not defined!')} 
        >
            <Image style={props.imageStyle} source={props.src} />
        </TouchableHighlight>
    );
}