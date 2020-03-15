import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Style from '../helpers/style/style';
import TabBar from '../components/TabBar';
import Routes from './Routes';
import Home from '../Screens/HomeScreen/Home';
import ProfileView from '../Screens/ProfileScreen/ProfileView/ProfileView';
import Graph from '../Screens/GraphScreen/Graph/Graph';
import RecentActions from '../Screens/RecentActionsScreen/RecentActions/RecentActions';
import PhotoScreen from '../Screens/PhotoScreen/PhotoScreen/PhotoScreen';
import Mail from '../components/Mail/Mail';
import Search from '../Screens/Search/Search';

export default createBottomTabNavigator(
  {
    [Routes.Screens.HOME.routeName]: {
      screen: Home,
    },
    [Routes.Screens.PROFILE.routeName]: {
      screen: ProfileView,
    },
    [Routes.Screens.GRAPH.routeName]: {
      screen: Graph,
    },
    [Routes.Screens.RECENT_ACTIONS.routeName]: {
      screen: RecentActions,
    },
    [Routes.Screens.PHOTO.routeName]: {
      screen: PhotoScreen
    },
    [Routes.Screens.MAIL.routeName]: {
      screen: Mail
    },
    [Routes.Screens.SEARCH.routeName]: {
        screen: Search
    },
  },
  {
    initialRouteName: Routes.Screens.HOME.routeName,
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
