import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import TabBar from '../components/TabBar/TabBar';
import Routes from '../utils/Routes';
import Home from '../Screens/HomeScreen/Home';
import ProfileView from '../Screens/ProfileScreen/ProfileView/ProfileView';
import Graph from '../Screens/GraphScreen/Graph/Graph';
import RecentActions from '../Screens/RecentActionsScreen/RecentActions/RecentActions';
import PhotoScreen from '../Screens/PhotoScreen/PhotoScreen/PhotoScreen';
import Mail from '../Screens/Mail/Mail';
import Search from '../Screens/Search/Search';
import TopScreen from '../Screens/TopScreen/TopScreen';

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
    [Routes.Screens.TOP.routeName]: {
      screen: TopScreen
    }
  },
  {
    initialRouteName: Routes.Screens.TOP.routeName,
    tabBarComponent: props => (
      <TabBar {...props} />
    )
  },
);
