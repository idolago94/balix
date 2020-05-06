import React, { Component, useState } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import IconButton from '../../IconButton/IconButton';
import { iconNames } from '../../Icon/Icon';

export default function CommentInput(props) {
    const [comment, setComment] = useState('');

    function onSend() {
        props.onSend(comment);
        props.sendDismissKeyboard && Keyboard.dismiss();
        setComment('');
    }

    return (
        <View style={props.style}>
            <View style={[s.container]}>
                <TextInput 
                    value={comment} 
                    style={s.input} 
                    onChangeText={s => setComment(s)} 
                    multiline={props.multiline}
                />
                <IconButton style={{padding: 6}} icon={iconNames.SEND} size={18} color={'black'} onPress={() => onSend()} />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        // margin: 3, 
        borderRadius: 20, 
        backgroundColor: 'lightgray'
    },
    input: {
        flexGrow: 1, 
        color: 'black', 
        padding: 4
    }
})