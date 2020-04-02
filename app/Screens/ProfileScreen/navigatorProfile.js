import {createStackNavigator} from 'react-navigation-stack';
import commonRoutes from '../../Routes/commonRoutes';
import Routes from '../../Routes/Routes';
import { colors } from '../../utils/style';

// export const profileRoutesName = {
// 	PROFILE_VIEW: 'ProfileView',
// 	MAIL: 'Mail',
// 	// PHOTO: 'Photo',
// 	COMMENTS: 'Comments',
// 	SEARCH_SCREEN: 'SearchScreen',
// };

export default createStackNavigator(
	{
		...commonRoutes,
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.PROFILE.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
