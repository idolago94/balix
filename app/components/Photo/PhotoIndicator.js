import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import { colors } from '../../utils/style';
import { thousandsWithCommas } from '../../utils/Tools';

export default function PhotoIndicator(props) {
  // Props = [ indicators: {cash: number, hearts: number} ]

    return (
      <View style={{position: 'absolute', right: 0, alignItems: 'flex-start'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          {/* <Icon color={colors.text} name={iconNames.DOLLAR} size={22} /> */}
          <Image style={{height: 22, aspectRatio: 1}} source={require('../../assets/dollar_indicator.png')} />
          <Text style={{color: colors.text}}>{thousandsWithCommas(props.cash)}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          {/* <Icon color={colors.text} name={iconNames.FULL_HEART} size={22} /> */}
          <Image style={{height: 22, aspectRatio: 1}} source={require('../../assets/heart_indicator.png')} />
          <Text style={{color: colors.text}}>{thousandsWithCommas(props.hearts)}</Text>
        </View>
      </View>
    );
}
