import {createStackNavigator} from 'react-navigation-stack';
import Graph from './Graph/Graph';
import commonRoutes from '../../Routes/commonRoutes';
import Style from '../../helpers/style/style';
import Routes from '../../Routes/Routes';

// export const graphRoutesName = {
// 	GRAPH: 'Graph',
// 	MAIL: 'Mail',
// 	PROFILE_VIEW: 'ProfileView',
// };

export default createStackNavigator(
	{
		...commonRoutes,
		[Routes.Screens.GRAPH.routeName]: {
			screen: Graph,
		},
	},
	{
		// ...commonRouteConfig,
		initialRouteName: Routes.Screens.GRAPH.routeName,
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Style.colors.bar,
			},
			headerTintColor: Style.colors.icon,
		},
	},
);
