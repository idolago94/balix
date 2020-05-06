import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
        // <View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity 
              style={[props.style, (props.story || props.live) ? (styles.storyBorder):({})]} 
              onPress={props.press ? (e => props.press(e)):(() => console.log('symbol press'))}
            >
              <ProgressiveImage 
                style={[styles.image, {height: props.size, width: props.size}]}
                url={props.src || 'non-profile'}
              />
            </TouchableOpacity>
            {props.icon && <TouchableOpacity
              style={[styles.icon, props.iconStyle, {top: iconPosition.y, left: iconPosition.x, padding: props.iconSize*0.5 || (props.size/5.5)*0.5}]}
              onPress={props.iconPress ? (props.iconPress.bind(this)):(() => console.log('icon press'))}
            >
              <Icon
                size={props.iconSize || props.size/5.5}
                name={props.icon}
                color={props.iconColor || colors.icon}
              />
            </TouchableOpacity>}
          </View>
        //   {props.live && <LiveIndicator press={imageClicked.bind(this)} size={props.size} />}
        // </View>
    );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 999,
    backgroundColor: 'gray'
  },
  icon: {
    position: 'absolute',
    borderRadius: 999
  }
});
