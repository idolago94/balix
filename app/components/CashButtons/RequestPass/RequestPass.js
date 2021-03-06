import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TextInput, Animated } from 'react-native';
import { colors } from '../../../utils/style';

export default class RequestPass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: ''
    }
    this.requestHeight = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.spring(this.requestHeight, {
        toValue: 700
    }).start()
  }

  componentWillUnMount() {
    Animated.spring(this.requestHeight, {
      toValue: 0
    }).start()
  }

  confirmPress(pass) {
    this.props.onConfirm(pass);
  }

  render() {
    return (
            <View style={{alignItems: 'flex-end', padding: 5, paddingBottom: 25}}>
              <Animated.View style={{padding: 10, maxHeight: this.requestHeight, backgroundColor: 'rgba(0,0,0,1)', borderColor: colors.lightMain, borderWidth: 1, borderRadius: 10}}>
                <Text style={{color: colors.text}}>Authenticate password:</Text>
                <TextInput
                  onChangeText={(pass) => this.setState({confirmPassword: pass})}
                  value={this.state.confirmPassword}
                  style={{borderBottomColor: 'white', borderBottomWidth: 1, padding: 2, color: colors.text}}
                  placeholder='Confirm password'
                  placeholderTextColor={'gray'}
                  autoFocus={true}
                  secureTextEntry={true}
                  returnKeyType={'done'}
                  onSubmitEditing={() => this.confirmPress(this.state.confirmPassword)}
                />
                <Text style={{color: 'red', fontSize: 10}}>{this.props.error}</Text>
                <View style={{alignItems: 'center', paddingTop: 5}}>
                  <TouchableHighlight onPress={() => this.confirmPress(this.state.confirmPassword)} style={{backgroundColor: colors.darkMain, borderRadius: 20, alignItems: 'center'}}>
                    <Text style={{color: colors.text, paddingVertical: 5, paddingHorizontal: 10}}>Confirm</Text>
                  </TouchableHighlight>
                </View>
              </Animated.View>
            </View>
    );
  }
}
