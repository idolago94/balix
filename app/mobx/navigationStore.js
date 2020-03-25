import { observable, action, computed } from "mobx";
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Keyboard } from 'react-native';
import Routes from "../Routes/Routes";
import AuthStore from './authStore';

class NavigationStore {
    @observable _navigator = null;
    @observable prevPage = null;
    @observable currentScreen = null;
    @observable prevTab = null;
    @observable currentTab = Routes.Screens.HOME.routeName;
    @observable profileName = null;
    @observable.shallow banner = null;
    @observable tabs = [
        Routes.Screens.GRAPH.routeName,
        Routes.Screens.RECENT_ACTIONS.routeName,
        Routes.Screens.HOME.routeName,
        Routes.Screens.SEARCH.routeName,
        Routes.Screens.MAIL.routeName
    ]
    @observable nonBack = [
        Routes.Screens.HOME.routeName,
        Routes.Screens.RECENT_ACTIONS.routeName,
        Routes.Screens.GRAPH.routeName
    ]
    @observable nonHeaderButton = [
        Routes.Screens.PROFILE.routeName,
        Routes.Screens.PHOTO.routeName,
        Routes.Screens.SEARCH.routeName
    ]
    @observable nonCashIndicator = [
        Routes.Screens.PROFILE.routeName,
        Routes.Screens.PHOTO.routeName,
        Routes.Screens.SEARCH.routeName
    ];

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
    get isBack() {
        return !this.nonBack.includes(this.currentScreen);
    }

    @computed
    get isProfile() {
        return this.currentScreen == Routes.Screens.PROFILE.routeName;
    }

    @computed
    get isMyProfile() {
        return (this.currentScreen == Routes.Screens.PROFILE.routeName && this.whoProfile == AuthStore.getUserLogin.username);
    }

    @computed
    get isProfileTab() {
        return this.currentTab == Routes.Screens.PROFILE.routeName;
    }

    @computed
    get whoProfile() {
        return this.profileName;
    }

    @computed
    get isHeaderButton() {
        return !this.nonHeaderButton.includes(this.currentScreen);
    }

    @computed
    get isCashIndicator() {
        return (this.isProfileTab || !this.nonCashIndicator.includes(this.currentScreen));
    }

    @computed
    get isBanner() {
        return !!this.banner;
    }

    @computed
    get getBanner() {
        return this.banner;
    }

    //SET

    @action
    setBanner(data, color) {
        // data = String / Component
        // color = String / undefined;
        console.log('NavigationStore -> setBanner -> ', data);
        this.banner = {data, color};
        setTimeout(() => this.banner = null, 5000);
    }

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
        if(this.tabs.includes(data.routeName) || 
        (data.routeName == Routes.Screens.PROFILE.routeName && data.params.id == AuthStore.getUserLogin._id)) {
            this.currentTab = data.routeName;
        }
        this.prevPage = this.currentScreen
        this.currentScreen = data.routeName;
    }

    @action
    setProfileName(username) {
        this.profileName = username;
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
        this._navigator.dispatch(navigateAction)
    };

    @action
    goBack = () => {
        if(this.tabs.includes(this.prevPage)) {
            this.setCurrentTab(this.prevPage);
        }
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