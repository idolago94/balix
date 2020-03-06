import {createStackNavigator} from 'react-navigation-stack';
import Style from '../../helpers/style/style';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../../Routes/commonRoutes';
import Routes from '../../Routes/Routes';

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
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
