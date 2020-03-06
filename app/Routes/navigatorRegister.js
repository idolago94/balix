import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Routes from './Routes';
import SignupScreen from '../Screens/SignupScreen/SignupScreen';
import SetProfileImage from '../Screens/SignupScreen/SetProfileImage';
import SetKeywords from '../Screens/SignupScreen/SetKeywords';

export default createStackNavigator(
  {
    [Routes.Screens.REGISTER.routeName]: {
      screen: SignupScreen,
    },
    [Routes.Screens.SET_PROFILE.routeName]: {
        screen: SetProfileImage
    },
    [Routes.Screens.SET_KEYWORDS.routeName]: {
        screen: SetKeywords
    }
  },
  {
		mode: 'modal', //must be modal for transparent background
		headerMode: 'none',
        initialRouteName: Routes.Screens.REGISTER.routeName,
        defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
);
