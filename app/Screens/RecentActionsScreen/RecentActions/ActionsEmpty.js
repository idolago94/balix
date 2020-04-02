import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Icon, {iconNames} from "../../../components/Icon/Icon";
import { colors } from '../../../utils/style';

export default function ActionsEmpty(props) {

    return (
        <View style={styles.container}>
            <Icon color={'gray'} name={iconNames.TIMER} size={100} />
            <Text style={styles.content}>You don't have any actions yet.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height*0.5,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        color: 'gray',
        padding: 10
    }
});
