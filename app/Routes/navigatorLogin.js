import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Routes from '../utils/Routes';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import ResgisterNavigator from './navigatorRegister';
import TermsScreen from '../Screens/TermsScreen/TermsScreeen';

export default createAppContainer(createStackNavigator(
  {
    [Routes.Screens.LOGIN.routeName]: {
      screen: LoginScreen,
    },
    [Routes.Navigators.REGISTER.routeName]: {
        screen: ResgisterNavigator
    },
    [Routes.Screens.TERMS.routeName]: {
      screen: TermsScreen
    },
  },
  {
		mode: 'modal', //must be modal for transparent background
		headerMode: 'none',
        initialRouteName: Routes.Screens.LOGIN.routeName,
        defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
));
