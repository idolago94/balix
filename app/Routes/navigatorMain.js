import {createAppContainer} from 'react-navigation';
import LiveScreen from '../Screens/LiveScreen/LiveScreen';
import StoryScreen from '../Screens/StoryScreen/StoryScreen';
import NavigatorAdd from '../Screens/AddScreen/navigatorAdd';
import Routes from '../utils/Routes';
import BuyPackage from '../Screens/BuyPackage/BuyPackage';
import WithdrawScreen from '../Screens/WithdrawScreen/WithdrawScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import NavigatorStack from './navigatorStack';
import { colors } from '../utils/style';
import Drawer from '../components/Drawer/Drawer';
import EditProfileScreen from '../Screens/EditProfileScreen/EditProfileScreen';
import PolicyScreen from '../Screens/PolicyScreen/PolicyScreen';

export default createAppContainer(createDrawerNavigator(
  {
    [Routes.Navigators.STACK.routeName]: {
      screen: NavigatorStack,
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
    [Routes.Screens.EDIT_PROFILE.routeName]: {
      screen: EditProfileScreen
    },
    [Routes.Screens.POLICY.routeName]: {
      screen: PolicyScreen
    }
  },
  {
    // mode: 'modal', //must be modal for transparent background
    drawerBackgroundColor: colors.background,
    drawerPosition: 'right',
    drawerType: 'slide',
    contentOptions: {
      inactiveTintColor: colors.text
    },
		// headerMode: 'none',
    initialRouteName: Routes.Navigators.STACK.routeName,
    defaultNavigationOptions: {
			gestureEnabled: false,
			cardShadowEnabled: false,
			animationEnabled: false,
    },
    contentComponent: Drawer
  },
));
