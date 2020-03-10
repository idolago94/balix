import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from './CameraScreen';
import PreviewPhoto from './PreviewPhoto';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';

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
				backgroundColor: Style.colors.addBar,
			},
			headerTransparent: true,
			headerTintColor: Style.colors.icon,
		},
	},
);
