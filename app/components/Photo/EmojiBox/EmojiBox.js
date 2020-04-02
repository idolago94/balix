import React, { Component } from 'react';
// Components
import { StyleSheet, View, Image, Animated, TouchableHighlight, Text } from 'react-native';
import Emoji from './Emoji';
import Icon, { iconNames } from '../../Icon/Icon';
import { colors } from '../../../utils/style';
import emojis from '../../../utils/emojis';

export default class EmojiBox extends Component {
    // Props = [ emojiSize, emojiPress, heartPress, includeHeart ]

    constructor(props) {
        super(props);
        this.state = {
            emojis: []
        }
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.spring(this.animation, {
           toValue: 999,
        }).start();
        this.setState({emojis: emojis})
    }

    componentWillUnMount() {
        Animated.spring(this.animation, {
            toValue: 0,
         }).start();
         this.setState({emojis: emojis})
    }

    render() {
        const {emojiSize, emojiPress, heartPress, includeHeart} = this.props;
        return (
            <Animated.View
              style={{
                ...styles.container,
                maxWidth: this.animation,
                height: this.animation.interpolate({
                    inputRange: [0, 999],
                    outputRange: [0, 130]
                })
              }}
            >
                {includeHeart && (
                    <TouchableHighlight style={{margin: 7}} onPress={(ev) => heartPress(ev)}>
                        <View >
                            <Icon name={iconNames.FULL_HEART} size={emojiSize} color={colors.heart} />
                            <View style={{width: '100%', height: 13}}></View>
                        </View>
                    </TouchableHighlight>
                )}
                {
                    Object.keys(this.state.emojis).map((key, i) => (
                        <TouchableHighlight key={i} onPress={(ev) => emojiPress(this.state.emojis[key], ev)}>
                            <Emoji data={this.state.emojis[key]} size={emojiSize} />
                        </TouchableHighlight>
                    ))
                }
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.popup,
        borderRadius: 5,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    emoji: {
        margin: 7
    }
});
