import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Routes from '../utils/Routes';
import navigatorTabs from './navigatorTabs';
import Header from '../components/Header/Header';

export default createStackNavigator(
  {
    [Routes.Navigators.TABS.routeName]: {
      screen: navigatorTabs,
    }
  },
  {
		// mode: 'modal', //must be modal for transparent background
    headerMode: 'screen',
    initialRouteName: Routes.Navigators.TABS.routeName,
    defaultNavigationOptions: {
      header: () => <Header />,
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
);
