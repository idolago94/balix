import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import LoginNavigator from './app/Routes/navigatorLogin';
import * as Stores from './app/mobx';
import AppScreen from './app/Screens/AppScreen';
import { Provider, inject, observer } from "mobx-react/native";


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

@inject("AuthStore")
@observer
class RootComponent extends Component {
    render() {
		const Root = this.props.AuthStore.getUserLogin._id ? AppScreen : LoginNavigator;
        return (
            <Root />
        )
    }
}