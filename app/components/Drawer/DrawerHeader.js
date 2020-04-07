import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert, SafeAreaView} from 'react-native';
import {colors} from '../../utils/style';
import ProfileSymbol from '../ProfileSymbol/ProfileSymbol';

export default function DrawerHeader(props) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 0.3, borderBottomColor: 'lightgray'}}>
            <ProfileSymbol 
                style={{paddingRight: 5}}
                src={props.user.profileImage}
                size={28}
            />
            <Text style={s.title}>{props.user.username}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    title: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold'
    }
})