import {createStackNavigator} from 'react-navigation-stack';
import CameraScreen from './CameraScreen';
import PreviewPhoto from './PreviewPhoto';
import Gallery from './Gallery';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';

// export const addRouteNames = {
// 	CAMERA_SCREEN: 'CameraScreen',
// 	PREVIEW_PHOTO: 'PreviewPhoto',
// 	GALLERY_SCREEN: 'GalleryScreen',
// };

export default createStackNavigator(
	{
		[Routes.Screens.CAMERA.routeName]: {
			screen: CameraScreen,
		},
		[Routes.Screens.PREVIEW_PHOTO.routeName]: {
			screen: PreviewPhoto,
		},
		[Routes.Screens.GALLERY.routeName]: {
			screen: Gallery,
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
