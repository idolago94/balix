// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, Dimensions} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
// Navigator
import Routes from '../../utils/Routes';
import { inject, observer } from "mobx-react";
import UpdatesService from '../../Services/Updates';
import ProfileIndicator from '../HomeScreen/ProfileIndicator';
import {content_height, window_height, window_width} from '../../utils/view';
import {Bar} from 'react-native-progress';
import { roller, roller_container, main_view, colors } from '../../utils/style';
import { getCurrenIndexInFlatList } from '../../utils/Tools';

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
			if(!this.props.NavigationStore.inProgress) {
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
		let listLength = this.props.IdentifierStore.getTop.length-1;
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
		const rollerItems = currentIndex > 0 ? (this.props.IdentifierStore.getTop.slice(currentIndex)):(this.props.IdentifierStore.getTop);
		// const rollerItems = currentIndex > 0 ? (this.props.IdentifierStore.getTop.slice(currentIndex-1)):(this.props.IdentifierStore.getTop);
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
				<View style={{zIndex: 999}}>
					<FlatList 
						ref={(ref) => this._roller = ref}
						style={roller}
						horizontal={true}
						keyExtractor={(item, index) => index.toString()}
						data={rollerItems}
						contentContainerStyle={roller_container}
						renderItem={({item, index}) => (
							<ProfileIndicator 
								index={index+this.state.currentContentIndex-1 < 0 ? (0):(index+this.state.currentContentIndex-1)}
								onPress={() => this.onRollerItem(index+this.state.currentContentIndex-1 < 0 ? (0):(index+this.state.currentContentIndex-1))}								
								inView={0 == this.state.currentContentIndex && index == 0 || 0 < this.state.currentContentIndex && index == 0}								
								// inView={0 == this.state.currentContentIndex && index == 0 || 0 < this.state.currentContentIndex && index == 1}
								data={item}
								// isBack={0 < this.state.currentContentIndex && index == 0}
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
						data={this.props.IdentifierStore.getTop}
						renderItem={({item, index}) => (
							<Photo 
								index={index}
								navigation={this.props.navigation} 
								titlePress={this.onTitlePress.bind(this)}
								data={item}
								isLast={index == this.props.IdentifierStore.getTop.length-1}
							/>
						)}
					/>
				</View>
			</View>
		);
	}
}