import React, {Component} from 'react';
// Componenta
import {StyleSheet, View, TouchableHighlight, Dimensions} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import { sizes, colors } from '../../utils/style';
import IconButton from '../IconButton/IconButton';

export default function Buttons(props) {

    const iconColor = 'rgba(210,210,210,0.5)';
    return (
        <View style={styles.buttonsBox}>
          <IconButton 
            style={[styles.icon, {alignSelf: 'flex-start'}]} 
            icon={iconNames.FULL_SHARE} 
            size={sizes.icon-7} 
            color={colors.icon} 
            onPress={() => props.onOpenEmoji()}
          />
          <View style={{flexDirection: 'row'}}>
            <IconButton 
              style={styles.icon} 
              icon={iconNames.FULL_EARN} 
              size={sizes.icon+10} 
              color={colors.icon} 
              onPress={() => props.onOpenEmoji()}
            />
            <IconButton 
              style={[styles.icon, {alignSelf: 'flex-end'}]} 
              icon={iconNames.FULL_COMMENT} 
              size={sizes.icon-7} 
              color={colors.icon} 
              onPress={() => props.onOpenEmoji()}
            />            
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsBox: {
      position: 'absolute',
      bottom: 0,
    },
    icon: {
      padding: 10,
      borderRadius: 999,
      backgroundColor: 'rgba(210,210,210,0.3)',
      // alignSelf: 'flex-start',
      margin: 3
    }
  });