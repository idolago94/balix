import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Style from '../helpers/style/style';
import NavigatorHome from '../Screens/HomeScreen/navigatorHome';
import NavigatorProfile from '../Screens/ProfileScreen/navigatorProfile';
import TabBar from '../components/TabBar';
import NavigatorGraph from '../Screens/GraphScreen/navigatorGraph';
import NavigatorPhoto from '../Screens/PhotoScreen/navigatorPhoto';
import NavigatorRecentActions from '../Screens/RecentActionsScreen/navigatorRecentActions';
import Routes from './Routes';
import NavigatorMail from '../components/Mail/navigatorMail';
import NavigatorSearch from './navigatorSearch';

export default createBottomTabNavigator(
  {
    [Routes.Navigators.HOME.routeName]: {
      screen: NavigatorHome,
    },
    [Routes.Navigators.PROFILE.routeName]: {
      screen: NavigatorProfile,
    },
    [Routes.Navigators.GRAPH.routeName]: {
      screen: NavigatorGraph,
    },
    [Routes.Navigators.RECENT_ACTIONS.routeName]: {
      screen: NavigatorRecentActions,
    },
    [Routes.Navigators.PHOTO.routeName]: {
      screen: NavigatorPhoto
    },
    [Routes.Navigators.MAIL.routeName]: {
      screen: NavigatorMail
    },
    [Routes.Navigators.SEARCH.routeName]: {
        screen: NavigatorSearch
    },
  },
  {
    initialRouteName: Routes.Navigators.HOME.routeName,
    tabBarComponent: props => (
      <TabBar {...props} />
    ),
    tabBarOptions: {
      inactiveTintColor: Style.colors.icon,
      activeTintColor: Style.colors.lightMain,
      style: {
        backgroundColor: Style.colors.bar,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: Style.sizes.barHeight,
      },
    },
  },
);
