import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils/style';

export default function SingleComment(props) {
    // Props = [ data ]

    return (
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{props.data.user}: </Text>
            <Text style={styles.content}>{props.data.comment}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        color: colors.text,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 16,
        color: colors.text
    }
});
