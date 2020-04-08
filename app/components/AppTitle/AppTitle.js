import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import { colors } from '../../utils/style';

export default function AppTitle(props) {

  return (
    <View>
        <LinearTextGradient
            style={styles.appName}
            locations={[0, 1]}
            colors={[colors.lightMain, colors.darkMain]}
        >
            <Text>Balix</Text>
        </LinearTextGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    appName: {
        fontSize: 70,
        marginBottom: 30,
        fontWeight: 'bold'
    },
});
