import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InfoTitle from './InfoTitle';
import { BarChart } from 'react-native-svg-charts';
import { withComma } from '../../../common/numberMethods';

export default class CashEarn extends Component {
  render() {
    return (
        <View style={styles.container}>
          <InfoTitle title={`${withComma(23674)}$`} />
          <View style={this.props.style}>
            <BarChart
              style={{ height: this.props.height, width: this.props.width }}
              data={[45, 60, 90, 99, 130]}
              svg={{ fill: this.props.fill }}
              contentInset={{ bottom: 10 }}
              >
            </BarChart>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
  }
});
