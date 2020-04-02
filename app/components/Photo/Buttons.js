import React, {Component} from 'react';
// Componenta
import {StyleSheet, View, TouchableHighlight, Dimensions} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import { sizes, colors } from '../../utils/style';

export default function Buttons(props) {

    return (
        <View style={styles.buttonsBox}>
          <View style={styles.leftSide}>
            <TouchableHighlight onPress={() => props.onOpenEmoji()}>
              <Icon style={styles.icon} name={iconNames.FULL_EARN} size={sizes.icon}
                    color={colors.icon}/>
            </TouchableHighlight>
            <Icon style={styles.icon} name={iconNames.FULL_COMMENT} size={sizes.icon}
                  color={colors.icon}/>
            <Icon style={styles.icon} name={iconNames.FULL_SHARE} size={sizes.icon}
                  color={colors.icon}/>
          </View>
          <View style={styles.rightSide}>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width,
      marginTop: 10,
      alignItems: 'center'
    },
    leftSide: {
      flexDirection: 'row',
    },
    icon: {
      padding: 10,
    }
  });