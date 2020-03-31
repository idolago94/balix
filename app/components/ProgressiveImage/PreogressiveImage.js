import React, {Component} from 'react';
// Componenta
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import DoubleClick from 'react-native-double-click';
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';

@inject('BuffersStore')
@observer
export default class ProgressiveImage extends Component {

  constructor(props) {
    console.log('ProgressiveImage -> constructor');
    super(props);
    this.imageLoad = new Animated.Value(0);
  }

  onImageLoad() {
    Animated.timing(this.imageLoad, {
      toValue: 1,
    }).start();
  }

  render() {
    console.log('Photo -> render');
    if(this.props.onDoubleClick) {
        return (
            <DoubleClick onClick={this.props.onDoubleClick.bind(this)} style={{backgroundColor: '#dddddd'}}>
                <Animated.Image
                  style={[this.props.style, {opacity: this.imageLoad}]}
                  source={{uri: this.props.url}}
                  onLoad={() => this.onImageLoad()}
                />
            </DoubleClick>
        )
    }
    return (
        <Animated.Image
            style={[this.props.style, {opacity: this.imageLoad}]}
            source={this.props.url != 'non-profile' ? ({uri: this.props.url}):(require('../../assets/non-profile.png'))}
            onLoad={() => this.onImageLoad()}
        />
    )
  }
}
