import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import InfoTitle from './InfoTitle';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function FollowersGraph(props) {
    return (
        <View style={[props.style, {width: props.width}]}>
          <InfoTitle title="23K Followers" />
            <AreaChart
              style={{ height: props.height-40 }}
              data={[45, 60, 55, 73, 70]}
              svg={{ fill: props.fill }}
              curve={shape.curveNatural}
              >
                <Grid />
            </AreaChart>
        </View>
    );
}
