import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated, TextInput} from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, {iconNames} from '../../Icon/Icon';
import { inject, observer } from "mobx-react";
import ApiService from '../../../Services/Api';

@inject('UsersStore', 'IdentifierStore')
export default class SearchInput extends Component {

    constructor(props) {
        super(props);
        this.inputGrow = new Animated.Value(0);
        this.inputPaddingHorizontal = new Animated.Value(0);
        this.inputOpacity = new Animated.Value(0);
        this.iconBackground = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.inputGrow, {
                toValue: 1
            }),
            Animated.timing(this.inputPaddingHorizontal, {
                toValue: 10
            }),
            Animated.timing(this.inputOpacity, {
                toValue: 1
            }),
            Animated.timing(this.iconBackground, {
                toValue: 1
            })
        ]).start();
    }

    componentWillUnmount() {
        Animated.parallel([
            Animated.timing(this.inputGrow, {
                toValue: 0
            }),
            Animated.timing(this.inputPaddingHorizontal, {
                toValue: 0
            }),
            Animated.timing(this.inputOpacity, {
                toValue: 0
            }),
            Animated.timing(this.iconBackground, {
                toValue: 0
            })
        ]).start();
    }

    async handleSearch(text) {
		const {UsersStore, IdentifierStore} = this.props;
		if(text.length >= 3) {
            let searchResponse = await ApiService.handleSearch(text);
            UsersStore.setUsers(searchResponse);
            let result_ids = searchResponse.map(r => r._id);
            IdentifierStore.setSearch(result_ids);
		}
		if(text.length < 3) {
            IdentifierStore.clearSearch();
		}
	}

    render() {
        return (
            <View style={styles.searchBox}>
                <Animated.View style={
                    {
                        ...styles.inputBox,
                        flexGrow: this.inputGrow,
                        paddingHorizontal: this.inputPaddingHorizontal,
                        opacity: this.inputOpacity,
                    }}>
                    <TextInput autoFocus value={this.props.wordSearch}
                            onChangeText={(text) => this.handleSearch(text)}
                            style={styles.input}/>
                </Animated.View>
                <Animated.View style={{
                    ...styles.searchIconBox,
                    padding: this.inputPaddingHorizontal,
                    backgroundColor: this.iconBackground.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['rgba(125,125,125,0)', 'gray'],
                    }),
                }}>
                    <Icon color={Style.colors.icon} name={iconNames.SEARCH}
                        size={Style.sizes.icon} style={styles.icon}/>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	searchIconBox: {
		padding: 2,
		borderRadius: 999,
	},
	searchBox: {
		// flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
        marginRight: 15,
	},
	inputBox: {
		height: '80%',
		borderTopLeftRadius: 999,
		borderBottomLeftRadius: 999,
		backgroundColor: Style.colors.background,
		transform: [
			{translateX: 10},
		],
	},
	input: {
		// width: '100%',
		height: '90%',
		borderTopLeftRadius: 999,
		borderBottomLeftRadius: 999,
		color: Style.colors.text,
		fontSize: 14,
		backgroundColor: Style.colors.background,
	},
});