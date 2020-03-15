import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated} from 'react-native';
import Icon, {iconNames} from '../../Icon/Icon';

export default class BackButton extends Component {

    render() {
        return (
            <Animated.View style={{}}>
                <TouchableHighlight onPress={() => this.props.onPress()}>
                    <Icon color={this.props.color} name={iconNames.LEFT_CHEVRON} size={this.props.size}
                        style={{margin: 10}}/>
                </TouchableHighlight>
            </Animated.View>
        )
    }
}