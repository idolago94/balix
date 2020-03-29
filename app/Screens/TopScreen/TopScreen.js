// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, Dimensions} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
// Navigator
import Routes from '../../Routes/Routes';

import Style from '../../helpers/style/style';

import { inject, observer } from "mobx-react";
import UpdatesService from '../../Services/Updates';
import ProfileIndicator from '../HomeScreen/ProfileIndicator';
import {content_height, window_height, window_width} from '../../utils/view';
import {Bar} from 'react-native-progress';

@inject('NavigationStore', 'IdentifierStore')
@observer
export default class TopScreen extends Component {
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
		this._roller = null;
		this._view = null;
	}

	componentDidMount() {
		console.log('content_height', content_height);
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			console.log('HomeScreen -> willFocus');
			if(!this.props.NavigationStore.isProgress) {
				UpdatesService.updateTop();
			}
		})
	}

	componentWillUnMount() {
		this.focusListener.remove();
	}

	onTitlePress(user) {
		this.props.NavigationStore.navigate(Routes.Screens.PROFILE, {userData: user});
	}

	handleScroll(event) {
		let listLength = this.props.IdentifierStore.getFollowing.length-1;
		if(listLength > 0) {
			let index = this.getCurrentIndexInView(event.nativeEvent.contentOffset.y);
			if(index > listLength) {
				index = listLength;
			} else if(index < 0) {
				index = 0;
			}
			if(this.state.currentContentIndex != index) {
				this._roller.scrollToIndex({index: index > 0 ? (index-1):(0)});
				this.setState({currentContentIndex: index})
			}
		}
	}

	getCurrentIndexInView(y) {
		let pointMove = content_height*0.6;
		let n = content_height - pointMove;
		let index = Math.floor(y / n);
		// console.log(y);
		// console.log(index);
		return index;
	}

	onRollerItem(i) {
		this._view.scrollToIndex({index: i});
		this._roller.scrollToIndex({index: i > 0 ? (i-1):(0)});
		this.setState({currentContentIndex: i})
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: Style.colors.background}}>
				<View style={{zIndex: 999}}>
					<FlatList 
						ref={(ref) => this._roller = ref}
						style={{overflow: 'visible', backgroundColor: Style.colors.background, paddingVertical: 3, borderBottomWidth: 1, borderColor: 'gray'}}
						horizontal={true}
						keyExtractor={(item, index) => index.toString()}
						data={this.props.IdentifierStore.getTop}
						contentContainerStyle={styles.profileIndicator}
						renderItem={({item, index}) => (
							<ProfileIndicator 
								index={index}
								onPress={() => this.onRollerItem(index)}
								inView={this.state.currentContentIndex == index}
								data={item}
							/>
						)}			
					/>
				</View>
				{this.props.NavigationStore.inProgress && <Bar 
					indeterminate 
					height={3} 
					width={window_width} 
					color={Style.colors.darkMain} 
					unfilledColor={Style.colors.background} 
					borderWidth={0} 
				/>}
				<View>
					<FlatList
						ref={(ref) => this._view = ref}
						onScroll={(e) => this.handleScroll(e)}
						style={styles.following}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						data={this.props.IdentifierStore.getTop}
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
		alignItems: 'flex-end',
	}
});