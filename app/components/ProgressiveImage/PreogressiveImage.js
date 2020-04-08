import React, {Component} from 'react';
// Componenta
import {StyleSheet, Text, View, Image, ScrollView, TouchableWithoutFeedback, Animated, Dimensions, Alert} from 'react-native';
import DoubleClick from 'react-native-double-click';
import Video from 'react-native-video';

export default class ProgressiveImage extends Component {

  constructor(props) {
    console.log('ProgressiveImage -> constructor');
    super(props);
    this.state={
      videoMuted: true
    }
    this.imageLoad = new Animated.Value(0);
  }

  onImageLoad() {
    Animated.timing(this.imageLoad, {
      toValue: 1,
    }).start();
  }

  render() {
    console.log('Photo -> render');
    if(this.props.smallView) {
      return (
        <View>
          {!this.props.contentType || !this.props.contentType.includes('video') ? (
            <Animated.Image
                style={[this.props.style, {opacity: this.imageLoad}]}
                source={this.props.url != 'non-profile' ? ({uri: this.props.url}):(require('../../assets/non-profile.png'))}
                onLoad={() => this.onImageLoad()}
            />
          ):(
            <Video 
              style={[this.props.style]}
              source={{uri: this.props.url}}
              muted
              repeat
            />
          )}
        </View>
      )
    }
    if(this.props.onDoubleClick) {
        return (
            <DoubleClick onClick={this.props.onDoubleClick.bind(this)} style={{backgroundColor: '#dddddd'}}>
              {!this.props.contentType || !this.props.contentType.includes('video') ? (
                <Animated.Image
                  style={[this.props.style, {opacity: this.imageLoad}]}
                  source={{uri: this.props.url}}
                  onLoad={() => this.onImageLoad()}
                />
              ):(
                <TouchableWithoutFeedback onPress={() => this.setState({videoMuted: !this.state.videoMuted})}>
                  <Video 
                    style={[this.props.style]}
                    source={{uri: this.props.url}}
                    muted={this.state.videoMuted}
                    repeat
                  />
                </TouchableWithoutFeedback>
              )}
            </DoubleClick>
        )
    }
    return (
      <View>
        {!this.props.contentType || !this.props.contentType.includes('video') ? (
          <Animated.Image
              style={[this.props.style, {opacity: this.imageLoad}]}
              source={this.props.url != 'non-profile' ? ({uri: this.props.url}):(require('../../assets/non-profile.png'))}
              onLoad={() => this.onImageLoad()}
          />
        ):(
          <TouchableWithoutFeedback onPress={() => this.setState({videoMuted: !this.state.videoMuted})}>
            <Video 
              style={[this.props.style]}
              source={{uri: this.props.url}}
              muted={this.state.videoMuted}
              repeat
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    )
  }
}
