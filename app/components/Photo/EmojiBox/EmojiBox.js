import React, { Component } from 'react';
// Components
import { StyleSheet, View, Image, Animated, TouchableHighlight, Text } from 'react-native';
import Style from '../../../helpers/style/style';
import Emoji from './Emoji';
import { emojis } from '../../../common/emojiVariables';
import Icon, { iconNames } from '../../Icon/Icon';

export default class EmojiBox extends Component {
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
           toValue: 999,
        }).start();
        this.setState({emojis: emojis})
    }

    render() {
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
                {
                    (!this.props.includeHeart) ? (<View></View>) :
                    (
                    <TouchableHighlight style={{margin: 7}} onPress={(ev) => this.props.heartPress(ev)}>
                        <View >
                            <Icon name={iconNames.FULL_HEART} size={this.props.emojiSize} color={Style.colors.heart} />
                            {/* <Text style={{color: Style.colors.text, fontSize: 10}}>0$</Text> */}
                            <View style={{width: '100%', height: 13}}></View>
                        </View>
                    </TouchableHighlight>
                    )
                }
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
        padding: 10,
        backgroundColor: Style.colors.popup,
        borderRadius: 5,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    emoji: {
        margin: 7
    }
});
