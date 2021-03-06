import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearTextGradient } from "react-native-text-gradient";
import { colors } from '../../utils/style';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = props => (
    <MaskedView maskElement={<Text {...props} />}>
        <LinearGradient colors={[colors.lightMain, colors.darkMain]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Text {...props} style={[props.style, { opacity: 0 }]} />
        </LinearGradient>
    </MaskedView>
);

export default function AppTitle(props) {
  return (
    <View>
        <GradientText style={s.appName}>Balix</GradientText>
    </View>
  )
}


const s = StyleSheet.create({
    appName: {
        fontSize: 70,
        marginBottom: 30,
        fontWeight: 'bold',
    },
});
