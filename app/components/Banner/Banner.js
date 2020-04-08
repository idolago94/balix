import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Dimensions, Platform} from 'react-native';
import { sizes } from '../../utils/style';

export default class Banner extends Component {

    constructor(props) {
        super(props);
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        console.log('Banner -> componentDidMount');
        Animated.timing(this.animation, {
            toValue: 600,
            duration: 1000
        }).start();
    }

    componentWillUnMount() {
        console.log('Banner -> componentWillUnMount');
        Animated.timing(this.animation, {
            toValue: 0,
            duration: 1000
        }).start();
    }

    render() {
        return (
            <Animated.View 
                style={[s.container, {
                    backgroundColor: this.props.color || 'red',
                    maxHeight: this.animation,
                }]}
            >
                <View style={{height: Platform.OS == 'ios' ? (sizes.iphone_notch):(0)}} />
                <View style={s.contentBox}>
                    {typeof this.props.content == 'string' ? (
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.content}</Text>
                    ) : (this.props.content)}
                </View>
            </Animated.View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        top: 0,
        zIndex: 9999
    },
    contentBox: {
        padding: 10,
        justifyContent: 'center', 
        alignItems: 'center'
    }
})