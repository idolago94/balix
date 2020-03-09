import React, {Component} from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import Shimmer from 'react-native-shimmer';

export default function StoryIndicator(props) {
  // Props = [ size: number, press ]

    return (
        <TouchableHighlight onPress={props.press.bind(this)} style={{position: 'absolute', top: -12, left: -12}}>
          <View style={{aspectRatio: 1, position: 'relative', top: 0, left: 0}}>
            <Shimmer direction={'up'}>
              <Image
                source={require('../../assets/story-arrow.png')}
                style={{height: props.size*1.5, width: props.size*1.5, opacity: 1}}
              />
            </Shimmer>
          </View>
        </TouchableHighlight>
    );
}
