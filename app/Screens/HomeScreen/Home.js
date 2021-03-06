// Components
import React, {Component} from 'react';
import {View, FlatList, Keyboard} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
import HomeEmpty from "./HomeEmpty";
import { inject, observer } from "mobx-react";
import UpdatesService from '../../Services/Updates';
import ProfileIndicator from './ProfileIndicator';
import {content_height} from '../../utils/view';
import {roller, roller_container, main_view, colors} from '../../utils/style';
import { getCurrenIndexInFlatList } from '../../utils/Tools';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

@inject('NavigationStore', 'IdentifierStore', 'AppStore')
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
		this.keyboardShow = null;
		this.keyboardHide = null;
	}

	componentDidMount() {
		console.log('content_height', content_height);
		this.focusListener = this.props.navigation.addListener('willFocus', () => {
			console.log('HomeScreen -> willFocus');
			this._view && this._view.scrollToOffset({y: 0});
			this.setState({currentContentIndex: 0});
			if(!this.props.NavigationStore.inProgress) {
				UpdatesService.checkFollowingUpdates();
			}
		});
		this.keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
			this._view.setNativeProps({ scrollEnabled: false });
			this._roller.setNativeProps({ scrollEnabled: false })
		});
		this.keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
			this._view.setNativeProps({ scrollEnabled: true });
			this._roller.setNativeProps({ scrollEnabled: true })
		});
	}

	componentWillUnMount() {
		this.focusListener.remove();
		this.keyboardShow.remove();
		this.keyboardHide.remove();
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
				this.props.AppStore.setVideoVolume(null);
				this._view.scrollToIndex({index: index > 0 ? (index):(0)});
				this.setState({currentContentIndex: index})
			}
		}
	}

	onRollerItem(i) {
		console.log('onRollerItem -> ', i);
		this.props.AppStore.setVideoVolume(null);
		this._view.scrollToIndex({index: i});
		this.setState({currentContentIndex: i})
	}

	render() {
		const currentIndex = this.state.currentContentIndex;
		const rollerItems = currentIndex > 0 ? (this.props.IdentifierStore.getFollowing.slice(currentIndex+1)):(this.props.IdentifierStore.getFollowing.slice(1));
		// const rollerItems = currentIndex > 0 ? (this.props.IdentifierStore.getFollowing.slice(currentIndex-1)):(this.props.IdentifierStore.getFollowing);
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
				<View style={{zIndex: 999, flexDirection: 'row', maxHeight: roller_container.maxHeight}}>
					{this.props.IdentifierStore.getFollowing.length > 0 && <ProfileIndicator 
						inView={true}								
						data={this.props.IdentifierStore.getFollowing[currentIndex]}
					/>}
					<FlatList 
						ref={(ref) => this._roller = ref}
						style={[roller]}
						horizontal={true}
						keyExtractor={(item, index) => index.toString()}
						data={rollerItems}
						contentContainerStyle={[roller_container]}
						renderItem={({item, index}) => (
							<ProfileIndicator 
								onPress={() => this.onRollerItem(index+this.state.currentContentIndex+1 < 0 ? (0):(index+this.state.currentContentIndex+1))}
								// inView={0 == this.state.currentContentIndex && index == 0 || 0 < this.state.currentContentIndex && index == 0}
								// inView={0 == this.state.currentContentIndex && index == 0 || 0 < this.state.currentContentIndex && index == 1}
								data={item}
								// isBack={0 < this.state.currentContentIndex && index == 0}
							/>
						)}			
					/>
				</View>
				{this.props.NavigationStore.inProgress && <ProgressBar />}
				<View>
					<FlatList
						ref={(ref) => this._view = ref}
						style={main_view}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={() => <HomeEmpty/>}
						refreshing={this.props.NavigationStore.inProgress}
						onRefresh={() => UpdatesService.checkFollowingUpdates()}
						onScrollEndDrag={(e) => this.handleScroll(e)}
						keyExtractor={(item, index) => index.toString()}
						data={this.props.IdentifierStore.getFollowing}
						renderItem={({item, index}) => (
							<Photo 
								id={`HOME_`}
								index={index}
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