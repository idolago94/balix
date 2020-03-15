// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
// Navigator
import AppNavigator from '../../Routes/AppNavigator';
import Routes from '../../Routes/Routes';

import Style from '../../helpers/style/style';

import HomeEmpty from "./HomeEmpty";
import db from '../../database/db';
import { inject, observer } from "mobx-react/native";

@inject('AuthStore', 'UsersStore', 'NavigationStore')
@observer
export default class Home extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	constructor(props) {
		super(props);
		this.focusListener = null;
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			console.log('HomeScreen -> willFocus');
			this.props.UsersStore.fetchUsers(this.props.AuthStore.getUserLogin.following);
		})
	}

	componentWillUnMount() {
		this.focusListener.remove();
	}

	onTitlePress(user) {
		this.props.NavigationStore.navigate(Routes.Screens.PROFILE, {userData: user});
	}

	symbolPressed(index) {
		let user = this.props.users.users[index];
		if (user.live) {
			// connect to agora(live stream).
		} else if (user.story) {
			this.props.NavigationStore.navigate(Routes.Screens.STORY.routeName, {
				userIndex: index
			});
		}
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
						<FlatList
							style={styles.following}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => index.toString()}
							ListEmptyComponent={() => <HomeEmpty/>}
							data={this.props.UsersStore.getContents}
							renderItem={({item, index}) => (
								<Photo 
									index={index}
									navigation={this.props.navigation} 
									titlePress={this.onTitlePress.bind(this)}
									data={item}
								/>
							)}
						/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Style.colors.background,
	},
	storyContainer: {
		flexDirection: 'row',
		borderTopColor: 'white',
		borderTopWidth: 4,
		backgroundColor: Style.colors.bar
	},
	following: {
		backgroundColor: Style.colors.background
	}
});