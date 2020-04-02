import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
import commonRoutes, {commonRouteConfig} from '../../Routes/commonRoutes';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';

export default createStackNavigator(
	{
		...commonRoutes,
		[Routes.Screens.HOME.routeName]: {
			screen: Home,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.HOME.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.bar
			},
			headerTintColor: colors.icon,

		},

	},
);
