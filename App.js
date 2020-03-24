import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import LoginNavigator from './app/Routes/navigatorLogin';
import * as Stores from './app/mobx';
import AppScreen from './app/Screens/AppScreen';
import { Provider, inject, observer } from "mobx-react";
import {create} from 'mobx-persist';
import {AsyncStorage} from 'react-native';
import ApiService from './app/Services/Api';

// const hydrate = create({
//     storage: AsyncStorage,
// });

// hydrate('AuthStore', Stores.AuthStore);
// hydrate('ContentsStore', Stores.ContentsStore);
// hydrate('UsersStore', Stores.UsersStore);
// hydrate('IdentifierStore', Stores.IdentifierStore);
// hydrate('BuffersStore', Stores.BuffersStore);
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

@inject("AuthStore", 'ActionsStore')
@observer
class RootComponent extends Component {

	async componentDidMount() {
		let actionsType = await ApiService.getActionsTypes();
		this.props.ActionsStore.setTypes(actionsType);
	}

    render() {
		const Root = this.props.AuthStore.getUserLogin._id ? AppScreen : LoginNavigator;
        return (
            <Root />
        )
    }
}