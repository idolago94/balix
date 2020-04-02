import {createStackNavigator} from 'react-navigation-stack';
import Graph from './Graph/Graph';
import commonRoutes from '../../Routes/commonRoutes';
import Routes from '../../Routes/Routes';
import { colors } from '../../utils/style';


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
				backgroundColor: colors.bar,
			},
			headerTintColor: colors.icon,
		},
	},
);
