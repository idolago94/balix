import React, {Component} from 'react';
// Redux
import {Provider} from 'react-redux';
import store from './app/store/store';
import LoginNavigator from './app/Routes/navigatorLogin';
import AppNavigator from './app/Routes/AppNavigator';

export default class App extends Component {

	render() {
		return (
			<Provider store={store}>
				<LoginNavigator ref={(r) => AppNavigator.setRef(r)} />
			</Provider>
		);
	}
}
