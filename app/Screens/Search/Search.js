import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, FlatList, Text} from 'react-native';
import Header from '../../components/Header/Header';
import Style from '../../helpers/style/style';
import {connect} from 'react-redux';
import Result from './Result';
import Routes from '../../Routes/Routes';
import SearchEmpty from "./SearchEmpty";
import NotFound from "./NotFound";
import db from '../../database/db';
import { inject, observer } from 'mobx-react';

@inject('NavigationStore', 'IdentifierStore', 'LoaderStore')
@observer
export default class Search extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	navigateTo(routeName, params) {
		this.props.NavigationStore.navigate(routeName, params);
	}

	render() {
		if(this.props.LoaderStore.isVisible) {
			return <Text>Loader</Text>
		} else if(!this.props.IdentifierStore.isHandleSearch) {
			return (<SearchEmpty/>)
		}
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item, index) => index.toString()}
					ListEmptyComponent={() => <NotFound/>}
					data={this.props.IdentifierStore.getSearch}
					renderItem={({item}) => (
						<TouchableHighlight
							onPress={this.navigateTo.bind(this, Routes.Screens.PROFILE.routeName, {id: item})}>
							<Result id={item}/>
						</TouchableHighlight>
					)}
				/>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Style.colors.background
	},
	textBox: {
		fontSize: 70,
		color: Style.colors.text,
	},
});
