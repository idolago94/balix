import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from "../../components/Icon/Icon";

export default function HomeEmpty() {

    return (
        <View style={styles.container}>
            <Icon color={'gray'} name={iconNames.HOME} size={100} />
            <Text style={styles.content}>You don't have any post to display.</Text>
            <Text style={styles.content}>Start follow users to see posts in this page.</Text>
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
        padding: 5
    }
});
