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

  async componentDidMount() {
    console.log('ProgressiveImage -> componentDidMount');
    let base64 = this.props.BuffersStore.getBase64(this.props.buffer_id);
    if(!base64) {
      let buffer = await ApiService.getBuffer(this.props.buffer_id);
      this.props.BuffersStore.setBuffers([buffer]);
    }
  }

  onImageLoad() {
    Animated.timing(this.imageLoad, {
      toValue: 1,
    }).start();
  }

  render() {
    console.log('Photo -> render');
    const base64 = this.props.BuffersStore.getBase64(this.props.buffer_id);
    if(this.props.onDoubleClick) {
        return (
            <DoubleClick onClick={this.props.onDoubleClick.bind(this)} style={{backgroundColor: 'lightgray'}}>
                <Animated.Image
                    style={[this.props.style, {opacity: this.imageLoad}]}
                    source={{uri: base64}}
                    onLoad={() => this.onImageLoad()}
                />
            </DoubleClick>
        )
    }
    return (
        <Animated.Image
            style={[this.props.style, {opacity: this.imageLoad}]}
            source={{uri: base64}}
            onLoad={() => this.onImageLoad()}
        />
    )
  }
}
