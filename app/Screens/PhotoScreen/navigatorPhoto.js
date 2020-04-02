import {createStackNavigator} from 'react-navigation-stack';
import commonRoutes, {commonRoutesName, commonRouteConfig} from '../../Routes/commonRoutes';
import PhotoScreen from './PhotoScreen/PhotoScreen';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';

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
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
