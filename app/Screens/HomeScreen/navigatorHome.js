import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home';
import commonRoutes, {commonRouteConfig} from '../../Routes/commonRoutes';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';

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
				backgroundColor: Style.colors.bar
			},
			headerTintColor: Style.colors.icon,

		},

	},
);
