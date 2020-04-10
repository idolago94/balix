import React, { Component } from 'react';
// Components
import { StyleSheet, View, Image, Animated, TouchableHighlight, Text } from 'react-native';
import Emoji from './Emoji';
import Icon, { iconNames } from '../../Icon/Icon';
import { colors } from '../../../utils/style';
import { inject } from 'mobx-react';
import { window_width } from '../../../utils/view';
import IconButton from '../../IconButton/IconButton';

@inject('AppStore')
export default class EmojiBox extends Component {
    // Props = [ emojiSize, emojiPress, heartPress, includeHeart ]

    constructor(props) {
        super(props);
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.spring(this.animation, {
           toValue: 999,
        }).start();
    }

    componentWillUnMount() {
        Animated.spring(this.animation, {
            toValue: 0,
         }).start();
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
                <IconButton onPress={() => this.props.onClose()} style={styles.closeIcon} icon={iconNames.CLOSE} size={13} />
                {includeHeart && (
                    <TouchableHighlight style={{margin: 7}} onPress={(ev) => heartPress(ev)}>
                        <View >
                            <Icon name={iconNames.FULL_HEART} size={emojiSize} color={colors.heart} />
                            <View style={{width: '100%', height: 13}}></View>
                        </View>
                    </TouchableHighlight>
                )}
                {
                    Object.keys(this.props.AppStore.getEmojis).map((key, i) => (
                        <TouchableHighlight key={i} onPress={(ev) => emojiPress(this.props.AppStore.getEmojis[key], ev)}>
                            <Emoji data={this.props.AppStore.getEmojis[key]} size={emojiSize} />
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
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        width: window_width,
    },
    emoji: {
        margin: 7
    },
    closeIcon: {
        position: 'absolute', 
        top: -35, 
        left: 10,
        borderRadius: 999,
        padding: 7,
        backgroundColor: colors.popup
    }
});
