import React, {Component, useRef, useState} from 'react';
// Componenta
import {StyleSheet, View, Text, Animated, TouchableWithoutFeedback} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import { sizes, colors } from '../../utils/style';
import IconButton from '../IconButton/IconButton';
import { window_width, sliceString, content_height } from '../../utils/view';

export default function Buttons(props) {
    const initialHeight = 50;
    const heightAnim = useRef(new Animated.Value(initialHeight)).current;
    const [more, setMore] = useState(false);

    function increaseHeight() {
      Animated.timing(heightAnim, {
        toValue: content_height-200
      }).start(() => setMore(true))
    }

    function decreaseHeight() {
      Animated.timing(heightAnim, {
        toValue: initialHeight
      }).start(() => setMore(false))
    }

    const titleLength = 20;
    return (
        <Animated.View style={[styles.buttonsBox, {maxHeight: heightAnim}]}>
          <View style={{maxWidth: window_width*0.37}}>
            <Text style={styles.title}>
              {more ? (props.content_title):(sliceString(props.content_title, titleLength))}
              {!more && props.content_title.length > titleLength && <TouchableWithoutFeedback onPress={() => increaseHeight()}>
                <Text style={{color: 'lightgray', fontSize: 14, fontStyle: 'italic'}}>See More</Text>
              </TouchableWithoutFeedback>}
            </Text>
          </View>
          {more && <IconButton 
            style={{alignSelf: 'flex-start', padding: 10, transform: [{ rotate: '90deg'}]}} 
            icon={iconNames.RIGHT_CHEVRON} 
            size={15} 
            onPress={() => decreaseHeight()}
          />}
          <View style={{flexDirection: 'row'}}>
            <IconButton 
              style={styles.icon} 
              icon={props.onDelete ? (iconNames.TRASH):(iconNames.FULL_EARN)} 
              size={sizes.icon+6} 
              color={colors.icon} 
              onPress={props.onDelete ?(() => props.onDelete()):(() => props.onOpenEmoji())}
            />
            <IconButton 
              style={[styles.icon]} 
              icon={iconNames.FULL_COMMENT} 
              size={sizes.icon+6} 
              color={colors.icon} 
              onPress={() => props.onComments()}
            />            
            <IconButton 
              style={[styles.icon]} 
              icon={iconNames.FULL_SHARE} 
              size={sizes.icon+6} 
              color={colors.icon} 
              onPress={() => props.onOpenEmoji()}
            />
          </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    buttonsBox: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: window_width,
      borderTopWidth: 0.5,
      borderColor: 'white'
    },
    icon: {
      padding: 10,
      borderRadius: 999,
    },
    title: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
      padding: 5
    }
  });