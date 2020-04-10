import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Animated, TextInput} from 'react-native';
import Icon, {iconNames} from '../../Icon/Icon';
import { inject, observer } from "mobx-react";
import ApiService from '../../../Services/Api';
import { colors, sizes } from '../../../utils/style';
import { window_width } from '../../../utils/view';

@inject('UsersStore', 'IdentifierStore')
export default class SearchInput extends Component {

    constructor(props) {
        super(props);
        this.inputGrow = new Animated.Value(0);
        this.iconPadding = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.inputGrow, {
                toValue: 1
            }),
            Animated.timing(this.iconPadding, {
                toValue: 10
            })
        ]).start();
    }

    componentWillUnmount() {
        Animated.parallel([
            Animated.timing(this.inputGrow, {
                toValue: 0
            }),
            Animated.timing(this.iconPadding, {
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
            <View style={s.searchBox}>

                <Animated.View style={[s.inputBox, {flexGrow: this.inputGrow}]}>
                    <TextInput  
                        autoFocus 
                        style={s.input}
                        value={this.props.wordSearch} 
                        onChangeText={(text) => this.handleSearch(text)}
                    />
                </Animated.View>

                <Animated.View style={[s.iconBox, {padding: this.iconPadding}]}>
                    <Icon color={colors.icon} name={iconNames.SEARCH} size={sizes.icon} />
                </Animated.View>
            </View>
        );
    }
}

const s = StyleSheet.create({
    searchBox: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        width: window_width-sizes.icon-15
    },
    inputBox: {
        borderRadius: 999,
        backgroundColor: colors.background,
        padding: 10
    },
    input: {
        borderTopLeftRadius: 999,   
        borderBottomLeftRadius: 999,
        color: colors.text,
        fontSize: 14,
        backgroundColor: colors.background,
    },
	iconBox: {
		padding: 10,
        borderRadius: 999,
        backgroundColor: 'gray',
        transform: [{translateX: -15}]
	},
});