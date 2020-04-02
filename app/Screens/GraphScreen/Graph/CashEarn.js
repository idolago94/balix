import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InfoTitle from './InfoTitle';
import { BarChart } from 'react-native-svg-charts';
import { withComma } from '../../../common/numberMethods';

export default function CashEarn(props) {
    return (
      <View style={[props.style, {width: props.width, height: props.height}]}>
      <InfoTitle title={`${withComma(23674)}$`} />
        <BarChart
          style={{ height: props.height-40 }}
          data={[45, 60, 90, 99, 130]}
          svg={{ fill: props.fill }}
          contentInset={{ bottom: 10 }}
          >
        </BarChart>
      </View>
    );
}
