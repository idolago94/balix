import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer'
import { Keyboard } from 'react-native';
import Routes from "../Routes/Routes";
import AuthStore from './authStore';

class NavigationStore {
    @observable _navigator = null;
    @observable prevPage = null;
    @observable currentScreen = null;
    @observable prevTab = null;
    @observable currentTab = Routes.Screens.HOME.routeName;
    @observable whoProfile = null;

    //GET

    @computed
    get getCurrentScreen() {
        return this.currentScreen;
    }
    
    @computed
    get getPrevPage() {
        return this.prevPage;
    }

    @computed
    get isSearch() {
        return this.currentScreen == Routes.Screens.SEARCH.routeName;
    }

    @computed
    get getCurrentTab() {
        return this.currentTab;
    }

    @computed
    get isProfile() {
        if(this.currentScreen == Routes.Screens.PROFILE.routeName || this.currentScreen == Routes.Screens.PHOTO.routeName) {
            return this.whoProfile;
        } else return null;   
    }

    @computed
    get isMyProfile() {
        return this.whoProfile == AuthStore.getUserLogin.username;
    }

    //SET

    @action
    setMainNavigation(data) {
        this._navigator = { ...data }
    }

    @action
    setCurrentTab(tab) {
        this.prevTab = this.currentTab;
        this.currentTab = tab;
    }

    @action
    updateCurrentScreen = (data) => {
        console.log('NavigationStore -> updateCurrentScreen');
        this.prevPage = this.currentScreen
        this.currentScreen = data
    }
    @action
    updatePrevPage(data) {
        this.prevPage = data
    }
    updatePages = (prev, cur) => {
        this.updatePrevPage(prev);
        this.updateCurrentScreen(cur)
    };

    //ACTIONS

    navigate = (data, _params) => {
        let { routeName, params } = data;
        const navigateAction = NavigationActions.navigate(
            routeName
                ? { routeName, params }
                : { routeName: data, params: { ..._params } });
        if((data == Routes.Screens.PROFILE.routeName || data == Routes.Screens.PHOTO.routeName) && _params && _params.userData) {
            this.whoProfile = _params.userData.username;
        } else {
            this.whoProfile = null;
        }
        this._navigator.dispatch(navigateAction)
    };

    @action
    goBack = () => {
        const navigateAction = NavigationActions.back();
        this._navigator.dispatch(navigateAction)
    };

    @action 
    toggleDrawer() {
        Keyboard.dismiss();
        this._navigator.dispatch(DrawerActions.toggleDrawer());
    }
}

export default new NavigationStore();