import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated} from 'react-native';
import Icon, {iconNames} from '../../Icon/Icon';
import { inject, observer } from "mobx-react";

export default class HeaderButton extends Component {

    constructor(props) {
        super(props);
        this.buttonWidth = new Animated.Value(0);
        this.buttonOpacity = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.buttonWidth, {
                toValue: 70,
            }),
            Animated.timing(this.buttonOpacity, {
                toValue: 1,
            })
        ]).start();
    }

    componentWillUnMount() {
        Animated.parallel([
            Animated.timing(this.buttonWidth, {
                toValue: 0
            }),
            Animated.timing(this.buttonOpacity, {
                toValue: 0
            })
        ]).start();
    }

    render() {
        return (
            <Animated.View style={{opacity: this.buttonOpacity, maxWidth: this.buttonWidth}}>
                <TouchableHighlight onPress={() => this.props.onPress()}>
                    <Icon color={this.props.color} name={this.props.icon} size={this.props.size}
                        style={{margin: 10}}/>
                </TouchableHighlight>
            </Animated.View>
        )
    }
}