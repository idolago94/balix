import React, {Component} from 'react';
// Navigation
import NavigatorMain from '../Routes/navigatorMain';
// Components
import {StyleSheet, View, Dimensions, Image} from 'react-native';
// import LoginScreen from './LoginScreen/LoginScreen';
import CashButtons from '../components/CashButtons/CashButtons';

import { inject, observer } from "mobx-react";
import Routes from '../utils/Routes';
import LottieView from 'lottie-react-native';
import { window_width, window_height } from '../utils/view';

@inject('AuthStore', 'NavigationStore')
@observer
export default class AppScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { lottieJson: '' }
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
    const {NavigationStore} = this.props;
      return (
        <View style={s.screen}>
          <NavigatorMain                 
            ref={ref => {
              NavigationStore.setMainNavigation(ref);
              NavigationStore.updateCurrentScreen({routeName: Routes.Screens.TOP.routeName});
              NavigationStore.updatePrevPage(null);
            }}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        </View>
      );
  }
}


const s = StyleSheet.create({
  screen: {
    flex: 1,
    height: window_height
  }
});
