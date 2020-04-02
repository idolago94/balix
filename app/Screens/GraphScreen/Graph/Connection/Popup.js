import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated } from 'react-native';
import { colors } from '../../../../utils/style';

export default class Popup extends Component {

  popAnimation = new Animated.Value(0);

  // componentDidUpdate() {
  //   let animationDuration = 500;
  //   if(this.props.position.open) {
  //       Animated.timing(this.popAnimation, {
  //           toValue: 100,
  //           duration: animationDuration
  //       }).start();
  //   } else {
  //       Animated.timing(this.popAnimation, {
  //           toValue: 0,
  //           duration: animationDuration
  //       }).start();
  //   }
  // }

  render() {
    return (
        <Animated.View style={{
            ...styles.pop,
            height: this.popAnimation,
            top: this.props.position.y,
            left: this.props.position.x
            }}>

        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    pop: {
        width: 100,
        backgroundColor: colors.popup,
        borderRadius: 20,
        position: 'absolute'
      }
});
