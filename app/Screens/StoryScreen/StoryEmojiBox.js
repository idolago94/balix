import React, { Component } from 'react';
// Components
import { StyleSheet, View, Animated, TouchableHighlight, Dimensions } from 'react-native';
import Emoji from '../../components/Photo/EmojiBox/Emoji';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { colors } from '../../utils/style';
import { inject } from 'mobx-react';

@inject('AppStore')
export default class StoryEmojiBox extends Component {
    // Props = [ emojiSize, emojiPress ]

    constructor(props) {
        super(props);
        this.state = {
            emojis: []
        }
        this.animation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.spring(this.animation, {
            toValue: 180,
        }).start();
        this.setState({emojis: this.props.AppStore.getEmojis})
    }

    componentWillUnMount() {
        Animated.spring(this.animation, {
            toValue: 0,
        }).start();
        this.setState({emojis: []})
    }

    render() {
        return (
            <Animated.View
                style={{
                    ...styles.container,
                    maxHeight: this.animation
                }}
            >
                {this.props.includeHeart && (
                    <TouchableHighlight style={styles.emoji} onPress={(ev) => this.props.heartPress(ev)}>
                        <View>
                            <Icon name={iconNames.FULL_HEART} size={this.props.emojiSize} color={colors.heart} />
                            <View style={{width: '100%', height: 13}}></View>
                        </View>
                    </TouchableHighlight>
                )}
                {
                    Object.keys(this.state.emojis).map((key, i) => (
                        <TouchableHighlight key={i} onPress={(ev) => this.props.emojiPress(this.state.emojis[key], ev)}>
                            <Emoji data={this.state.emojis[key]} size={this.props.emojiSize} />
                        </TouchableHighlight>
                    ))
                }
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        padding: 10,
        backgroundColor: colors.popup,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    emoji: {
        margin: 7
    }
});
