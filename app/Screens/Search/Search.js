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
import { inject, observer } from 'mobx-react/native';

@inject('SearchStore', 'NavigationStore')
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
		if(!this.props.SearchStore.getStatus) {
			return (<SearchEmpty/>)
		} else if(this.props.SearchStore.getStatus == 'PENDING') {
			return <Text>Loader</Text>
		}
		return (
			<View style={styles.container}>
				<FlatList
					keyExtractor={item => item._id.toString()}
					ListEmptyComponent={() => <NotFound/>}
					data={this.props.SearchStore.getResults}
					renderItem={({item}) => (
						<TouchableHighlight
							onPress={this.navigateTo.bind(this, Routes.Screens.PROFILE.routeName, {userData: item})}>
							<Result data={item}/>
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
