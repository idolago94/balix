import {createStackNavigator} from 'react-navigation-stack';
import Style from '../../helpers/style/style';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../../Routes/commonRoutes';
import RecentActions from './RecentActions/RecentActions';
import Routes from '../../Routes/Routes';

// export const recentActionsRoutesName = {
// 	RECENT_ACTIONS_SCREEN: 'RecentActionsScreen'
// };

export default createStackNavigator(
	{
        ...commonRoutes,
        [Routes.Screens.RECENT_ACTIONS.routeName]: {
            screen: RecentActions
        }
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.RECENT_ACTIONS.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
