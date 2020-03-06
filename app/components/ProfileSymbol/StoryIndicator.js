import React, {Component} from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import Shimmer from 'react-native-shimmer';

export default class StoryIndicator extends Component {
  // Props = [ size: number ]

  render() {
    return (
        <TouchableHighlight onPress={this.props.press.bind(this)} style={{position: 'absolute', top: -12, left: -12}}>
          <View style={{aspectRatio: 1, position: 'relative', top: 0, left: 0}}>
            <Shimmer direction={'up'}>
              <Image
                source={require('../../assets/story-arrow.png')}
                style={{height: this.props.size*1.5, width: this.props.size*1.5, opacity: 1}}
              />
            </Shimmer>
          </View>
        </TouchableHighlight>
    );
  }
}
