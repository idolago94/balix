import {createStackNavigator} from 'react-navigation-stack';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../../Routes/commonRoutes';
import RecentActions from './RecentActions/RecentActions';
import Routes from '../../Routes/Routes';
import { colors } from '../../utils/style';

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
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
