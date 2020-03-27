// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, Dimensions} from 'react-native';
import { inject, observer } from "mobx-react";

@inject('NavigationStore', 'AuthStore')
@observer
export default class EditProfileScreen extends Component {

	constructor(props) {
        super(props);
    }

	render() {
		return (
			<View style={{flex: 1}}>
			</View>
		);
	}
}

const s = StyleSheet.create({
});