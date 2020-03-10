import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InfoTitle from './InfoTitle';
import { BarChart } from 'react-native-svg-charts';
import { withComma } from '../../../common/numberMethods';

export default function CashEarn(props) {
    return (
        <View style={styles.container}>
          <InfoTitle title={`${withComma(23674)}$`} />
          <View style={props.style}>
            <BarChart
              style={{ height: props.height, width: props.width }}
              data={[45, 60, 90, 99, 130]}
              svg={{ fill: props.fill }}
              contentInset={{ bottom: 10 }}
              >
            </BarChart>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
  }
});
