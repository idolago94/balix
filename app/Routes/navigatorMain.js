import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigatorTabs from './navigatorTabs';
import LiveScreen from '../Screens/LiveScreen/LiveScreen';
import StoryScreen from '../Screens/StoryScreen/StoryScreen';
import NavigatorAdd from '../Screens/AddScreen/navigatorAdd';
import Routes from './Routes';
import BuyPackage from '../Screens/BuyPackage/BuyPackage';
import WithdrawScreen from '../Screens/WithdrawScreen/WithdrawScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Style from '../helpers/style/style';

export default createAppContainer(createDrawerNavigator(
  {
    [Routes.Navigators.TABS.routeName]: {
      screen: NavigatorTabs,
    },
    [Routes.Navigators.ADD.routeName]: {
      screen: NavigatorAdd,
    },
    [Routes.Screens.LIVE.routeName]: {
      screen: LiveScreen,
    },
    [Routes.Screens.STORY.routeName]: {
      screen: StoryScreen
    },
    [Routes.Screens.BUY_PACKAGE.routeName]: {
      screen: BuyPackage
    },
    [Routes.Screens.WITHDRAW.routeName]: {
      screen: WithdrawScreen
    },
  },
  {
    mode: 'modal', //must be modal for transparent background
    drawerBackgroundColor: Style.colors.background,
    drawerPosition: 'right',
    drawerType: 'slide',
    contentOptions: {
      inactiveTintColor: Style.colors.text
    },
		headerMode: 'none',
        initialRouteName: Routes.Navigators.TABS.routeName,
        defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
  },
));
