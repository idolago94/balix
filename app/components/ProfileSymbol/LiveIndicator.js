import React, {Component} from 'react';
import { View, Image,TouchableHighlight } from 'react-native';
import Shimmer from 'react-native-shimmer';

export default class LiveIndicator extends Component {
  // Props = [ size: number ]

  render() {
    return (
        <TouchableHighlight onPress={this.props.press.bind(this)} style={{position: 'absolute', top: -5, left: -2}}>
          <View style={{aspectRatio: 1, position: 'relative', top: 0, left: 0}}>
            <Shimmer direction={'up'}>
              <Image
                source={require('../../assets/live-arrow.png')}
                style={{height: this.props.size+13, width: this.props.size+13, opacity: 1, marginLeft: 5}}
              />
            </Shimmer>
          </View>
        </TouchableHighlight>
    );
  }
}
