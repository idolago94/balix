import {createStackNavigator} from 'react-navigation-stack';

import commonRoutes, {commonRouteConfig} from '../../Routes/commonRoutes';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';
import Mail from './Mail';


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
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
