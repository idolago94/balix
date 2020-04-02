import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Icon, { iconNames } from '../Icon/Icon';
import LiveIndicator from './LiveIndicator';
import ProgressiveImage from '../ProgressiveImage/PreogressiveImage';
import { colors } from '../../utils/style';

export default function ProfileSymbol(props) {
  // Props = [
  //   src: url,
  //   size: number,
  //   press: callback,
  //   icon: string,
  //   iconDeg: number,
  //   iconPress: callback,
  //   iconColor: string
  // ]

  function imageClicked(event) {
    props.press(event);
  }

  function calculateIconLocation(deg) {
    let radius = props.size / 2;
    let center = radius;
    let angleRad = deg * Math.PI / 180; // deg to rad
    return {
      x: radius * Math.cos(angleRad) + center - (props.size/6.5 + props.size/9) / 2,
      y: radius * Math.sin(angleRad) + center - (props.size/6.5 + props.size/9) / 2
    }
  }

    const iconPosition = calculateIconLocation(props.iconDeg || 145);
    return (
        <View style={{...props.style, alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'relative'}}>
          {
            (props.press) ?
            (
            <TouchableHighlight style={[(props.story || props.live) ? (styles.storyBorder):({})]} onPress={imageClicked.bind(this)}>
                <ProgressiveImage 
                  style={[styles.image, {height: props.size, width: props.size}]}
                  url={props.src || 'non-profile'}
                />
            </TouchableHighlight>
            ) :
            (
              <View style={[(props.story || props.live) ? (styles.storyBorder):({})]}>
                <ProgressiveImage 
                  style={[styles.image, {height: props.size, width: props.size}]}
                  url={props.src || 'non-profile'}
                />
              </View>
            )
          }
          {props.icon && (
              (props.iconPress) ?
              (
                <TouchableHighlight
                  style={[styles.icon, {top: iconPosition.y, left: iconPosition.x, padding: props.iconSize*0.5 || (props.size/5.5)*0.5}]}
                  onPress={props.iconPress.bind(this)}
                >
                  <Icon
                    size={props.iconSize || props.size/5.5}
                    name={props.icon}
                    color={props.iconColor || 'black'}
                  />
                </TouchableHighlight>
              ) :
              (
                <Icon
                  style={[styles.icon, {top: iconPosition.y, left: iconPosition.x, padding: props.iconSize*0.5 || (props.size/5.5)*0.5}]}
                  size={props.iconSize || props.size/5.5}
                  name={props.icon}
                  color={props.iconColor || 'black'}
                />
              ))
          }
          </View>
          {props.live && <LiveIndicator press={imageClicked.bind(this)} size={props.size} />}
        </View>
    );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
    backgroundColor: 'gray'
  },
  cashBox: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cash: {
    color: colors.text
  },
  icon: {
    position: 'absolute',
    // padding: 12, 
    borderRadius:999, 
    backgroundColor: colors.text,
    borderColor: colors.background,
    borderWidth: 3
  }
});
