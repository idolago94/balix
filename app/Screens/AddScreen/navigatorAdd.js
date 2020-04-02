import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from './CameraScreen';
import PreviewPhoto from './PreviewPhoto';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';

export default createStackNavigator(
	{
		[Routes.Screens.CAMERA.routeName]: {
			screen: CameraScreen,
		},
		[Routes.Screens.PREVIEW_PHOTO.routeName]: {
			screen: PreviewPhoto,
		},
	},
	{
		initialRouteName: Routes.Screens.CAMERA.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: colors.addBar,
			},
			headerTransparent: true,
			headerTintColor: colors.icon,
		},
	},
);
