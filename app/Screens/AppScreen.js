import React, {Component} from 'react';
// Navigation
import NavigatorMain from '../Routes/navigatorMain';
// Components
import {StyleSheet, View, Platform , Linking, Image} from 'react-native';
// import LoginScreen from './LoginScreen/LoginScreen';
import CashButtons from '../components/CashButtons/CashButtons';

import { inject, observer } from "mobx-react";
import Routes from '../utils/Routes';
import LottieView from 'lottie-react-native';
import { window_width, window_height } from '../utils/view';
import io from "socket.io-client";
import ApiService from '../Services/Api';

@inject('AuthStore', 'NavigationStore', 'ChatStore')
@observer
export default class AppScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { lottieJson: '' }
  }

  async componentDidMount() {
    this.props.ChatStore.initSocket();
    let roomsChat = await ApiService.getUserRoomsChat();
    this.props.ChatStore.setRooms(roomsChat);
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      }).catch(err => console.log(err));
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event) => {
    this.navigate(event.url);
  }
  
  navigate = (url) => {
    const { NavigationStore } = this.props;
    const route = url.replace(/.*?:\/\//g, '');
    const routeName = route.split('/')[0];
    let params = {};
    if(route.split('/').length > 1) {
      let params_arr = [];
      params_arr = route.split('/')[1]; // 'key1=value1&key2=value2
      params_arr = params_arr.split('&');
      params_arr.map(p => {
        params[p.split('=')[0]] = p.split('=')[1];
      });
    }
    NavigationStore.navigate(routeName, params);
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
