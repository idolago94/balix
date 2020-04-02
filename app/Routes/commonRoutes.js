import Comments from "../components/Photo/Comments/Comments";
import ProfileView from "../Screens/ProfileScreen/ProfileView/ProfileView";
import ConversationView from "../components/Mail/ConversationView/ConversationView";
import Routes from '../utils/Routes';
import PhotoScreen from "../Screens/PhotoScreen/PhotoScreen/PhotoScreen";

export const commonRouteConfig = {
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0
        }
    }),
    lazy: false
};

export default commonRoutes = {
    [Routes.Screens.PROFILE.routeName]: {
        screen: ProfileView
    },
    [Routes.Screens.PHOTO.routeName]: {
        screen: PhotoScreen
    },
    [Routes.Screens.COMMENTS.routeName]: {
        screen: Comments
    },
    [Routes.Screens.CONVERSATION.routeName]: {
        screen: ConversationView
    }
};
