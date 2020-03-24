import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Style from '../../../helpers/style/style';
import InfoTitle from './InfoTitle';
import Icon, { iconNames } from '../../../components/Icon/Icon';

export default function GenderGraph(props) {

  function makeDataForPie(data) {
    const pieData = data
      .map((value, index) => ({
        value: value.count,
        svg: {
          fill: value.color,
        },
          key: `pie-${index}`,
      }));
    return pieData;
  }

  function getPercentageString(num, total) {
    if(!num || !total) {
      return 0;
    }
    return ((num/total)*100).toString().slice(0, 4);
  }

    return (
        <View style={styles.container}>
          <InfoTitle title="Audience" />
          <View style={{...props.style, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <PieChart style={{ height: props.height, width: props.width }} data={makeDataForPie(props.data)} />
            <View style={styles.legendBox}>
              <View style={{...styles.legend, flexDirection: 'row'}}>
                <Icon name={iconNames.MALE} size={10} color={props.data[0].color} />
                <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontSize: 13}}>
                  {getPercentageString(props.data[0].count, props.data[0].count + props.data[1].count)}%
                </Text>
              </View>
              <View style={{...styles.legend, flexDirection: 'row'}}>
                <Icon name={iconNames.FEMALE} size={10} color={props.data[1].color} />
                <Text style={{color: 'rgba(255, 255, 255, 0.3)', fontSize: 13}}>
                  {getPercentageString(props.data[1].count, props.data[0].count + props.data[1].count)}%
                </Text>
              </View>
            </View>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: 'center'
  },
  legend: {
    alignItems: 'center'
  }
});
