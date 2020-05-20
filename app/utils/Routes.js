export default Routes = {
    Navigators: {
        TABS: {routeName: 'NAVIGATOR_TABS'},
        ADD: {routeName: 'NAVIGATOR_ADD'},
        HOME: {routeName: 'NAVIGATOR_HOME'},
        PROFILE: {routeName: 'NAVIGATOR_PROFILE'},
        GRAPH: {routeName: 'NAVIGATOR_GRAPH'},
        RECENT_ACTIONS: {routeName: 'NAVIGATOR_RECENT_ACTIONS'},
        PHOTO: {routeName: 'NAVIGATOR_PHOTO'},
        MAIL: {routeName: 'NAVIGATOR_MAIL'},
        SEARCH: {routeName: 'NAVIGATOR_SEARCH'},
        REGISTER: {routeName: 'NAVIGATOR_REGISTER'},
        DRAWER: {routeName: 'NAVIGATOR_DRAWER'},
        STACK: {routeName: 'NAVIGATOR_STACK'}
    },
    Screens: {
        LIVE: {routeName: 'SCREEN_LIVE'},
        BUY_PACKAGE: {routeName: 'SCREEN_BUY_PACKAGE'},
        WITHDRAW: {routeName: 'SCREEN_WITHDRAW'},
        STORY: {routeName: 'SCREEN_STORY'},
        RECENT_ACTIONS: {routeName: 'SCREEN_RECENT_ACTIONS'},
        PROFILE: {routeName: 'SCREEN_PROFILE'},
        PHOTO: {routeName: 'SCREEN_PHOTO'},
        HOME: {routeName: 'SCREEN_HOME'},
        GRAPH: {routeName: 'SCREEN_GRAPH'},
        CAMERA: {routeName: 'SCREEN_CAMERA', params: { isLive: 'isLive', secret: 'secret' }},
        PREVIEW_PHOTO: {routeName: 'SCREEN_PREVIEW_PHOTO', params: { image: 'imageData', secret: 'secret' }},
        GALLERY: {routeName: 'SCREEN_GALLERY'},
        MAIL: {routeName: 'SCREEN_MAIL'},
        SEARCH: {routeName: 'SCREEN_SEARCH'},
        CONVERSATION: {routeName: 'SCREEN_CONVERSATION'},
        SET_PROFILE: {routeName: 'SET_PROFILE'},
        REGISTER: {routeName: 'REGISTER'},
        SET_KEYWORDS: {routeName: 'SET_KEYWORDS'},
        LOGIN: {routeName: 'Login_Screen'},
        APP_SCREEN: {routeName: 'App_Screen'},
        TOP: {routeName: 'Top_Screen'},
        EDIT_PROFILE: {routeName: 'Edit_Profile'},
        POLICY: {routeName: 'Policy_Screen'},
        TERMS: {routeName: 'Terms_Screen'},
        CHAT_ROOM: {routeName: 'Chat_Room'}
    }
}