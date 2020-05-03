import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { colors } from '../../utils/style';
import { thousandsWithCommas } from '../../utils/Tools';
import IconButton from '../IconButton/IconButton';
import { iconNames } from '../Icon/Icon';

export default function PhotoIndicator(props) {
  // Props = [ indicators: {cash: number, hearts: number} ]

    return (
      <View style={[props.style, {position: 'absolute', right: 0, alignItems: 'center', zIndex: 999}]}>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          <Image style={{height: 22, aspectRatio: 1}} source={require('../../assets/dollar_indicator.png')} />
          <Text style={{color: colors.text}}>{thousandsWithCommas(props.cash)}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          <Image style={{height: 22, aspectRatio: 1}} source={require('../../assets/heart_indicator.png')} />
          <Text style={{color: colors.text}}>{thousandsWithCommas(props.hearts)}</Text>
        </View>
        {props.onDelete && <IconButton style={{padding: 10}} icon={iconNames.TRASH} size={22} onPress={() => props.onDelete()}/>}
      </View>
    );
}
