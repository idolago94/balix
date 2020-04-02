import {createStackNavigator} from 'react-navigation-stack';

import commonRoutes, {commonRouteConfig} from '../../Routes/commonRoutes';
import Routes from '../../utils/Routes';
import Mail from './Mail';
import { colors } from '../../utils/style';


export default createStackNavigator(
	{
		...commonRoutes,
		[Routes.Screens.MAIL.routeName]: {
			screen: Mail,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.MAIL.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
