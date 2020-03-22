import React, {Component} from 'react';
// Componenta
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import Style from '../../helpers/style/style';

export default function Buttons(props) {

    return (
        <View style={styles.buttonsBox}>
          <View style={styles.leftSide}>
            <TouchableHighlight onPress={() => props.onOpenEmoji()}>
              <Icon style={styles.icon} name={iconNames.FULL_EARN} size={Style.sizes.icon}
                    color={Style.colors.icon}/>
            </TouchableHighlight>
            <Icon style={styles.icon} name={iconNames.FULL_COMMENT} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
            <Icon style={styles.icon} name={iconNames.FULL_SHARE} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
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