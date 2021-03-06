import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native';
import { colors } from '../../utils/style';
import Icon from '../Icon/Icon';

export default function TaabButton(props) {
    const iconSize = 23;
    const activeColor = colors.lightMain;
    const inactiveColor = colors.text;
    return (
      <TouchableHighlight 
        onPress={() => props.onPress()} 
        style={props.style}
      >
        <Icon size={iconSize} name={props.icon} color={props.isSelected ? activeColor:inactiveColor} />
      </TouchableHighlight>
    )
}