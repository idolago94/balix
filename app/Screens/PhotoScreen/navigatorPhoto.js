import {createStackNavigator} from 'react-navigation-stack';
import Style from '../../helpers/style/style';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../../Routes/commonRoutes';
import PhotoScreen from './PhotoScreen/PhotoScreen';
import Routes from '../../Routes/Routes';

// export const photoRoutesName = {
// 	PROFILE_VIEW: 'ProfileView',
// 	MAIL: 'Mail',
// 	PHOTO_SCREEN: 'PhotoScreen',
// 	COMMENTS: 'Comments',
// 	SEARCH_SCREEN: 'SearchScreen',
// };

export default createStackNavigator(
	{
        ...commonRoutes,
        [Routes.Screens.PHOTO.routeName]: {
            screen: PhotoScreen
        }
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.PHOTO.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
