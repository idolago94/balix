import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InfoTitle from './InfoTitle';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function FollowersGraph(props) {
    return (
        <View style={styles.container}>
          <InfoTitle title="23K Followers" />
          <View style={props.style}>
            <AreaChart
              style={{ height: props.height, width: props.width }}
              data={[45, 60, 55, 73, 70]}
              svg={{ fill: props.fill }}
              curve={shape.curveNatural}
              >
                <Grid />
            </AreaChart>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    alignItems: 'center',
  }
});
