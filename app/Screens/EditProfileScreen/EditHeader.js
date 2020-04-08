import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, Dimensions} from 'react-native';
import BackButton from '../../components/Header/BackButton/BackButton';
import { colors } from '../../utils/style';

export default function EditHeader(props) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            {props.edit ? (
                <TouchableHighlight onPress={() => props.onCancel()} style={s.btn}>
                    <Text style={s.btn_text}>Cancel</Text>
                </TouchableHighlight>
            ):(<BackButton onPress={() => props.onBack()} color={colors.text} size={20}/>)}
            {props.edit && <TouchableHighlight onPress={() => props.onSave()} style={s.btn}>
                <Text style={s.btn_text}>Save</Text>
            </TouchableHighlight>}
        </View>
    )
}

const s = StyleSheet.create({
    btn: {
        padding: 15
    },
    btn_text: {
        color: colors.text,
        fontSize: 20
    }
})