import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import LoginNavigator from './app/Routes/navigatorLogin';
import { Provider } from "mobx-react/native";
import * as Stores from './app/mobx';
import AppScreen from './app/Screens/AppScreen';
import { inject, observer } from "mobx-react/native";

@inject('AuthStore')
@observer
export default class App extends Component {
	render() {
		const Root = this.props.AuthStore.getUserLogin ? AppScreen : LoginNavigator;
		return (
			<Provider store={...Stores}>
          		<StatusBar barStyle={'light-content'}/>
				<Root />
			</Provider>
		);
	}
}
