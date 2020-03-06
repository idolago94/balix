import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Icon, { iconNames } from '../Icon/Icon';
import Style from '../../helpers/style/style';
import StoryIndicator from './StoryIndicator';
import LiveIndicator from './LiveIndicator';
import { withComma } from '../../common/numberMethods';
import bufferToBase64 from '../../helpers/convert/Buffer';

export default class ProfileSymbol extends Component {
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

  imageClicked(event) {
    this.props.press(event);
  }

  calculateIconLocation(deg) {
    let radius = this.props.size / 2;
    let center = radius;
    let angleRad = deg * Math.PI / 180; // deg to rad
    return {
      x: radius * Math.cos(angleRad) + center - (this.props.size/6.5 + this.props.size/9) / 2,
      y: radius * Math.sin(angleRad) + center - (this.props.size/6.5 + this.props.size/9) / 2
    }
  }

  render() {
    const iconPosition = this.calculateIconLocation(this.props.iconDeg || 145);
    return (
        <View style={{...this.props.style, alignItems: 'center', position: 'relative'}}>
          <View style={{position: 'relative'}}>
          {
            (this.props.press) ?
            (
            <TouchableHighlight style={[(this.props.story || this.props.live) ? (styles.storyBorder):({})]} onPress={this.imageClicked.bind(this)}>
              <Image style={{
                  ...styles.image,
                borderRadius: this.props.story ? (999):(999),
                  height: this.props.size,
                  width: this.props.size
                  }} source={this.props.src ? ({uri:`data:${this.props.src.contentType};base64,${bufferToBase64(this.props.src.buffer)}`}):(require('../../assets/profileImage.png'))}
                />
            </TouchableHighlight>
            ) :
            (
              <View style={[(this.props.story || this.props.live) ? (styles.storyBorder):({})]}>
                <Image style={{
                  ...styles.image,
                  borderRadius: this.props.story ? (10):(999),
                  height: this.props.size,
                  width: this.props.size
                  }} source={this.props.src ? ({uri:`data:${this.props.src.contentType};base64,${bufferToBase64(this.props.src.buffer)}`}):(require('../../assets/profileImage.png'))}
                />
              </View>
            )
          }
          {
            (this.props.icon) ?
            (
              (this.props.iconPress) ?
              (
                <TouchableHighlight
                style={{position: 'absolute', top: iconPosition.y, left: iconPosition.x, padding: this.props.size/9, borderRadius:999, backgroundColor: Style.colors.background}}
                onPress={this.props.iconPress.bind(this)}
                >
                  <Icon
                    size={this.props.size/5.5}
                    name={this.props.icon}
                    color={this.props.iconColor || Style.colors.icon}
                  />
                </TouchableHighlight>
              ) :
              (
                <Icon
                  style={{position: 'absolute', top: iconPosition.y, left: iconPosition.x, padding: this.props.size/9, borderRadius:999, backgroundColor: Style.colors.background}}
                  size={this.props.size/6.5}
                  name={this.props.icon}
                  color={this.props.iconColor || Style.colors.icon}
                />
              )
            ) : (null)
          }
          </View>
          {
            (!this.props.showCash) ? (null) :
            (
            <View style={styles.cashBox}>
              <Icon name={iconNames.DOLLAR} size={this.props.size/4} color={Style.colors.darkMain}/>
              <Text style={{...styles.cash, fontSize: this.props.size/4}}>{withComma(this.props.cash)}</Text>
            </View>
            )
          }
          {/*{*/}
          {/*  (!this.props.story) ? (null) :*/}
          {/*  (<StoryIndicator press={this.imageClicked.bind(this)} size={this.props.size} />)*/}
          {/*}*/}
          {
            (!this.props.live) ? (null) :
            (<LiveIndicator press={this.imageClicked.bind(this)} size={this.props.size} />)
          }
        </View>
    );
  }
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
  storyBorder: {
    // padding: 1,
    // // borderColor: Style.colors.lightMain,
    // borderWidth: 2,
    // borderRadius: 999
  }
});
