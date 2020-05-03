import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, FlatList, Text} from 'react-native';
import Header from '../../components/Header/Header';
import Result from './Result';
import Routes from '../../utils/Routes';
import SearchEmpty from "./SearchEmpty";
import NotFound from "./NotFound";
import { inject, observer } from 'mobx-react';
import { colors } from '../../utils/style';

@inject('NavigationStore', 'IdentifierStore')
@observer
export default class Search extends Component {

	navigateTo(routeName, params) {
		this.props.NavigationStore.navigate(routeName, params);
	}

	render() {
		if(this.props.NavigationStore.getSearchStatus == 'PENDING') {
			return <Text>Loader</Text>
		} else if(!this.props.NavigationStore.getSearchStatus) {
			return (<SearchEmpty/>)
		}
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					ListEmptyComponent={() => <NotFound/>}
					data={this.props.IdentifierStore.getSearch}
					renderItem={({item}) => (
						<Result onPress={() => this.navigateTo(Routes.Screens.PROFILE.routeName, {id: item, secret: false})} id={item}/>
					)}
				/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	textBox: {
		fontSize: 70,
		color: colors.text,
	},
});
