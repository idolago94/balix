import {createStackNavigator} from 'react-navigation-stack';

import commonRoutes, {commonRouteConfig} from './commonRoutes';
import Style from '../helpers/style/style';
import Routes from './Routes';
import Search from '../Screens/Search/Search';


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
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
