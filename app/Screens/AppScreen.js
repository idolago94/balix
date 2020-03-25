import React, {Component} from 'react';
// Navigation
import NavigatorMain from '../Routes/navigatorMain';
import AppNavigator from '../Routes/AppNavigator';
// Components
import {StyleSheet, View, Dimensions} from 'react-native';
// import LoginScreen from './LoginScreen/LoginScreen';
import CashButtons from '../components/CashButtons/CashButtons';

import { inject, observer } from "mobx-react";
import Header from '../components/Header/Header';
import Routes from '../Routes/Routes';


@inject('CashButtonsStore', 'AuthStore', 'NavigationStore')
@observer
export default class AppScreen extends Component {

  constructor(props) {
    super(props);
  }

  _getCurrentRouteName(navState) {
    if (navState.hasOwnProperty('index')) {
        return this._getCurrentRouteName(navState.routes[navState.index])
    } else {
        return navState;
    }
  } 

  onNavigationStateChange = (oldState, newState, action) => {
    console.log('onNavigationStateChange -> ', this._getCurrentRouteName(newState))
    this.props.NavigationStore.updateCurrentScreen(this._getCurrentRouteName(newState));
  };

  render() {
    const {CashButtonsStore, AuthStore, NavigationStore} = this.props;
      return (
        <View style={styles.screen}>
          {CashButtonsStore.isVisible && <CashButtons />}
          <NavigatorMain                 
            ref={ref => {
              NavigationStore.setMainNavigation(ref);
              NavigationStore.updateCurrentScreen(Routes.Screens.HOME.routeName);
              NavigationStore.updatePrevPage(null);
            }}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: Dimensions.get('window').width * 1.75
  },
  screen: {
    flex: 1,
    flexGrow: 1,
  },
});
