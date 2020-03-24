import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Style from '../../helpers/style/style';
import { LinearTextGradient } from "react-native-text-gradient";

export default function AppTitle(props) {

  return (
    <View>
        {
            (Platform.OS != 'ios') ? (null):(<View style={{height: 30, backgroundColor: 'transparent'}}></View>)
        }
        <LinearTextGradient
            style={styles.appName}
            locations={[0, 1]}
            colors={[Style.colors.lightMain, Style.colors.darkMain]}
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
