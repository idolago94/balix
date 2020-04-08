import React, {Component} from 'react';
import {StatusBar, View, Text} from 'react-native';
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

// const hydrate = create({
//     storage: AsyncStorage,
// });

// hydrate('AuthStore', Stores.AuthStore);
// hydrate('ContentsStore', Stores.ContentsStore);
// hydrate('UsersStore', Stores.UsersStore);
// hydrate('IdentifierStore', Stores.IdentifierStore);
// hydrate('ActionsStore', Stores.ActionsStore);


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
		const {NavigationStore, AuthStore} = this.props;
		const Root = AuthStore.getUserLogin._id ? AppScreen : LoginNavigator;
        return (
			<SafeAreaView style={{flex: 1, backgroundColor: colors.bar}}>
				{NavigationStore.isBanner && <Banner color={NavigationStore.getBanner.color} content={NavigationStore.getBanner.data} />}
				{NavigationStore.isModal && <Modal content={NavigationStore.getModal} />}
				<Root />
			</SafeAreaView>
        )
    }
}