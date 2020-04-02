import {createStackNavigator} from 'react-navigation-stack';

import commonRoutes, {commonRouteConfig} from './commonRoutes';
import Routes from '../utils/Routes';
import Search from '../Screens/Search/Search';
import { colors } from '../utils/style';


export default createStackNavigator(
	{
		...commonRoutes,
		[Routes.Screens.SEARCH.routeName]: {
			screen: Search,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.SEARCH.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
