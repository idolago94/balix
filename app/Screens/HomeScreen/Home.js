// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, Dimensions} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
// Navigator
import Routes from '../../Routes/Routes';

import Style from '../../helpers/style/style';

import HomeEmpty from "./HomeEmpty";
import { inject, observer } from "mobx-react";
import UpdatesService from '../../Services/Updates';
import ProfileIndicator from './ProfileIndicator';
import {content_height} from '../../utils/view';

@inject('NavigationStore', 'IdentifierStore')
@observer
export default class Home extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			currentContentIndex: 0
		};
		this.focusListener = null;
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			console.log('HomeScreen -> willFocus');
			UpdatesService.checkFollowingUpdates();
		})
	}

	componentWillUnMount() {
		this.focusListener.remove();
	}

	onTitlePress(user) {
		this.props.NavigationStore.navigate(Routes.Screens.PROFILE, {userData: user});
	}

	handleScroll(event) {
		let contentOffset = event.nativeEvent.contentOffset;
		let index = Math.floor(contentOffset.y / (content_height-200));
		this.state.currentContentIndex != index && this.setState({currentContentIndex: index});
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<FlatList 
					style={{backgroundColor: Style.colors.background, padding: 5, borderBottomWidth: 1, borderColor: 'gray'}}
					horizontal={true}
					keyExtractor={(item, index) => index.toString()}
					data={this.props.IdentifierStore.getFollowing}
					contentContainerStyle={styles.profileIndicator}
					renderItem={({item, index}) => (
						<ProfileIndicator 
							inView={this.state.currentContentIndex == index}
							data={item}
						/>
					)}					
				/>
				<FlatList
					onScroll={(e) => this.handleScroll(e)}
					style={styles.following}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => index.toString()}
					ListEmptyComponent={() => <HomeEmpty/>}
					data={this.props.IdentifierStore.getFollowing}
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
	},
	profileIndicator: {
		alignItems: 'flex-end'
	}
});