import React, {Component} from 'react';
import {StatusBar, View, StyleSheet, Text} from 'react-native';
import LoginNavigator from './app/Routes/navigatorLogin';
import * as Stores from './app/mobx';
import AppScreen from './app/Screens/AppScreen';
import { Provider, inject, observer } from "mobx-react";
import {create} from 'mobx-persist';
import {AsyncStorage, SafeAreaView} from 'react-native';
import ApiService from './app/Services/Api';
import Banner from './app/components/Banner/Banner';
import Modal from './app/components/Modal/Modal';
import SplashScreen from 'react-native-splash-screen'
import { colors } from './app/utils/style';
import CashButtons from './app/components/CashButtons/CashButtons';
import LottieView from 'lottie-react-native';
import { window_width, window_height } from './app/utils/view';
import Popover from 'react-native-popover-view';

const hydrate = create({
    storage: AsyncStorage,
});

hydrate('AuthStore', Stores.AuthStore);

export default class App extends Component {

	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar barStyle={'light-content'}/>
				<Provider {...Stores}>
					<RootComponent />
				</Provider>
			</View>
		);
	}
}

@inject("AuthStore", 'ActionsStore', 'NavigationStore', 'AppStore')
@observer
class RootComponent extends Component {

	async componentDidMount() {
		let actionsType = await ApiService.getActionsTypes();
		let emojis = await ApiService.getEmojis();
		if(!actionsType.error && !emojis.error) {
			this.props.ActionsStore.setTypes(actionsType);
			this.props.AppStore.setEmojis(emojis);
			SplashScreen.hide();
		}
	}

    render() {
		const {NavigationStore, AuthStore, AppStore} = this.props;
		const Root = AuthStore.getUserLogin._id && AuthStore.getToken ? AppScreen : LoginNavigator;
        return (
			<SafeAreaView style={{flex: 1, backgroundColor: colors.notch}}>
				{/* <LottieView 
					style={s.animation} 
					source={require('./app/assets/anim/Bag_torn.json')}
					autoPlay
					autoSize={true}
				/> */}
				<Popover
					isVisible={NavigationStore.isPopover}
					fromView={NavigationStore.isPopover ? NavigationStore.isPopover.ref : null}
					onRequestClose={() => NavigationStore.setPopover(null)}
					placement='bottom'
				>
					{NavigationStore.isPopover && NavigationStore.isPopover.component}
				</Popover>

				{AppStore.getAnimation && <LottieView 
					style={s.animation} 
					source={JSON.parse(AppStore.getAnimation)}
					autoPlay
					autoSize={true}
					loop={false}
					onAnimationFinish={() => AppStore.setAnimation(null)}
				/>}
				{NavigationStore.isCashButtons && <CashButtons />}
				{NavigationStore.isBanner && <Banner color={NavigationStore.getBanner.color} content={NavigationStore.getBanner.data} />}
				{NavigationStore.isModal && <Modal type={NavigationStore.getModal.type} mode={NavigationStore.getModal.mode} content={NavigationStore.getModal.data} />}
				<Root />
			</SafeAreaView>
        )
    }
}

const s = StyleSheet.create({
	animation: {
	  position: 'absolute', 
	  top: 0, 
	  left: 0, 
	  zIndex: 999, 
	  width: window_width, 
	  height: window_height,
	  // borderWidth: 2, 
	  // borderColor: 'red',
	}
  });
  