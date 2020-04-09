// Components
import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
import Routes from '../../utils/Routes';
import HomeEmpty from "./HomeEmpty";
import { inject, observer } from "mobx-react";
import UpdatesService from '../../Services/Updates';
import ProfileIndicator from './ProfileIndicator';
import {content_height, window_height, window_width} from '../../utils/view';
import {Bar} from 'react-native-progress';
import {roller, roller_container, main_view, colors, photo_box} from '../../utils/style';
import { getCurrenIndexInFlatList } from '../../utils/Tools';

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
			currentContentIndex: 0,
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
				UpdatesService.checkFollowingUpdates();
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
		console.log('handleScroll');
		let listLength = this.props.IdentifierStore.getFollowing.length-1;
		if(listLength > 0) {
			let index = getCurrenIndexInFlatList(event.nativeEvent.contentOffset.y);
			if(index > listLength) {
				index = listLength;
			} else if(index < 0) {
				index = 0;
			}
			if(this.state.currentContentIndex != index) {
				this._view.scrollToIndex({index: index > 0 ? (index):(0)});
				this.setState({currentContentIndex: index})
			}
		}
	}

	onRollerItem(i) {
		console.log('onRollerItem -> ', i);
		this._view.scrollToIndex({index: i});
		this.setState({currentContentIndex: i})
	}

	render() {
		const currentIndex = this.state.currentContentIndex;
		const rollerItems = currentIndex > 0 ? (this.props.IdentifierStore.getFollowing.slice(currentIndex-1)):(this.props.IdentifierStore.getFollowing);
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
				<View style={{zIndex: 999}}>
					<FlatList 
						ref={(ref) => this._roller = ref}
						style={[roller]}
						horizontal={true}
						keyExtractor={(item, index) => index.toString()}
						data={rollerItems}
						contentContainerStyle={[roller_container]}
						renderItem={({item, index}) => (
							<ProfileIndicator 
								index={index+this.state.currentContentIndex-1 < 0 ? (0):(index+this.state.currentContentIndex-1)}
								onPress={() => this.onRollerItem(index+this.state.currentContentIndex-1 < 0 ? (0):(index+this.state.currentContentIndex-1))}
								inView={0 == this.state.currentContentIndex && index == 0 || 0 < this.state.currentContentIndex && index == 1}
								data={item}
								isBack={0 < this.state.currentContentIndex && index == 0}
							/>
						)}			
					/>
				</View>
				{this.props.NavigationStore.inProgress && <Bar 
					indeterminate 
					height={3} 
					width={window_width} 
					color={colors.darkMain} 
					unfilledColor={colors.background} 
					borderWidth={0} 
				/>}
				<View>
					<FlatList
						ref={(ref) => this._view = ref}
						onScrollEndDrag={(e) => this.handleScroll(e)}
						style={main_view}
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
								isLast={index == this.props.IdentifierStore.getFollowing.length-1}
							/>
						)}
					/>
				</View>
			</View>
		);
	}
}