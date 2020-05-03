import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions } from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { sizes, colors } from '../../utils/style';
import IconButton from '../../components/IconButton/IconButton';
import { window_width } from '../../utils/view';

export default function AddHeader(props){
    return (
      <View style={styles.container}>
        <IconButton 
          style={styles.btn}
          onPress={() => props.onClose()}
          icon={iconNames.CLOSE} 
          size={sizes.icon} 
          color={colors.icon}
        />
        <IconButton
          style={[styles.btn, {borderColor: !props.flashMode ? colors.icon : colors.lightMain}]} 
          icon={iconNames.FLASH} 
          size={sizes.icon} 
          color={!props.flashMode ? colors.icon : colors.lightMain} 
          onPress={() => props.onFlash()} 
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: window_width,
    padding: 5
  },
  btn: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 999,
  }
});
