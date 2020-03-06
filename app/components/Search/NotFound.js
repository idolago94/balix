import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from "../Icon/Icon";

export default function SearchEmpty() {

    return (
        <View style={styles.container}>
            <Icon color={'gray'} name={iconNames.SEARCH} size={100} />
            <Text style={styles.content}>Not Found.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height*0.5,
        backgroundColor: Style.colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        color: 'gray',
        padding: 10
    }
});
