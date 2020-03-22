import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Icon, { iconNames } from '../Icon/Icon';
import Style from '../../helpers/style/style';
import LiveIndicator from './LiveIndicator';
import { withComma } from '../../common/numberMethods';
import bufferToBase64 from '../../helpers/convert/Buffer';
import ProgressiveImage from '../ProgressiveImage/PreogressiveImage';

export default function ProfileSymbol(props) {
  // Props = [
  //   src: url,
  //   size: number,
  //   showCash: boolean,
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
    // const imageURI = props.src ? ({uri:`data:${props.src.contentType};base64,${bufferToBase64(props.src.buffer)}`}):(require('../../assets/profileImage.png'));
    return (
        <View style={{...props.style, alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'relative'}}>
          {
            (props.press) ?
            (
            <TouchableHighlight style={[(props.story || props.live) ? (styles.storyBorder):({})]} onPress={imageClicked.bind(this)}>
                <ProgressiveImage 
                  style={[styles.image, {height: props.size, width: props.size}]}
                  buffer_id={props.src}
                />
            </TouchableHighlight>
            ) :
            (
              <View style={[(props.story || props.live) ? (styles.storyBorder):({})]}>
                <ProgressiveImage 
                  style={[styles.image, {height: props.size, width: props.size}]}
                  buffer_id={props.src}
                />
              </View>
            )
          }
          {props.icon && (
              (props.iconPress) ?
              (
                <TouchableHighlight
                style={{position: 'absolute', top: iconPosition.y, left: iconPosition.x, padding: props.size/9, borderRadius:999, backgroundColor: Style.colors.background}}
                onPress={props.iconPress.bind(this)}
                >
                  <Icon
                    size={props.size/5.5}
                    name={props.icon}
                    color={props.iconColor || Style.colors.icon}
                  />
                </TouchableHighlight>
              ) :
              (
                <Icon
                  style={{position: 'absolute', top: iconPosition.y, left: iconPosition.x, padding: props.size/9, borderRadius:999, backgroundColor: Style.colors.background}}
                  size={props.size/6.5}
                  name={props.icon}
                  color={props.iconColor || Style.colors.icon}
                />
              ))
          }
          </View>
          {props.showCash && (
            <View style={styles.cashBox}>
              <Icon name={iconNames.DOLLAR} size={props.size/4} color={Style.colors.darkMain}/>
              <Text style={{...styles.cash, fontSize: props.size/4}}>{withComma(props.cash)}</Text>
            </View>
          )}
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
    color: Style.colors.text
  },
});
