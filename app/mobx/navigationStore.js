import { observable, action, computed } from "mobx";
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { Keyboard, Text } from 'react-native';
import Routes from "../utils/Routes";
import AuthStore from './authStore';
import {Alert} from 'react-native';
import AppStore from "./appStore";
import React from 'react';

class NavigationStore {
    @observable _navigator = null;
    @observable prevPage = null;
    @observable currentScreen = null;
    @observable prevTab = null;
    @observable currentTab = null;
    @observable profileName = null;
    @observable.shallow banner = null;
    @observable.shallow modal = null;
    @observable.shallow popover = null;
    @observable showProgress = false;
    @observable showCashButtons = false;
    @observable searchStatus = false;
    @observable tabs = [
        Routes.Screens.GRAPH.routeName,
        Routes.Screens.HOME.routeName,
        Routes.Screens.SEARCH.routeName,
        Routes.Screens.MAIL.routeName,
        Routes.Screens.TOP.routeName
    ]
    @observable nonBack = [
        Routes.Screens.HOME.routeName,
        Routes.Screens.TOP.routeName,
        Routes.Screens.GRAPH.routeName,
    ]
    @observable nonHeaderButton = [
        Routes.Screens.PROFILE.routeName,
        Routes.Screens.PHOTO.routeName,
        Routes.Screens.SEARCH.routeName,
        Routes.Screens.CHAT_ROOM.routeName,
        Routes.Screens.MAIL.routeName
    ]
    @observable nonCashIndicator = [
        Routes.Screens.PROFILE.routeName,
        Routes.Screens.PHOTO.routeName,
        Routes.Screens.SEARCH.routeName,
        Routes.Screens.CHAT_ROOM.routeName,
        Routes.Screens.MAIL.routeName
    ];

    //GET

    @computed
    get getCurrentScreen() {
        return this.currentScreen;
    }

    @computed
    get getSearchStatus() {
        return this.searchStatus;
    }

    @computed
    get isCashButtons() {
        return this.showCashButtons;
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
    get isPopover() {
        return this.popover;
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

    @computed
    get isModal() {
        return !!this.modal;
    }

    @computed
    get getModal() {
        return this.modal;
    }

    @computed
    get inProgress() {
        return this.showProgress;
    }

    //SET

    @action
    setPopover(viewRef, component) {
        if(viewRef) {
            if(typeof component == 'string') {
                component = <Text>{component}</Text>
            }
            this.popover = {
                ref: viewRef,
                component
            }
        } else this.popover = null;
    }

    @action
    setSearch(status) {
        this.searchStatus = status;
    }

    @action
    setProgress(bool) {
        console.log('NavigationStore -> setProgress', bool);
        this.showProgress = bool;
    }

    @action
    showAlert(title, msg, confirmCallback, cancelCallback) {
        Alert.alert(title, msg,
            [{
                text: 'Cancel',
                onPress: (cancelCallback) ? (() => cancelCallback()):(() => console.log('Cancel Pressed')),
            },
            {
                text: 'OK', 
                onPress: () => confirmCallback()
            }],
            {cancelable: false},
        );
    }

    setModal(view) {
        // view = Component
        this.modal = view;
    }

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
        console.log('NavigationStore -> updateCurrentScreen', data);
        this.showCashButtons = false;
        if(this.tabs.includes(data.routeName) || 
        (data.routeName == Routes.Screens.PROFILE.routeName && data.params.id == AuthStore.getUserLogin._id)) {
            this.profileName = AuthStore.getUserLogin.username;
            this.currentTab = data.routeName;
        }
        AppStore.setVideoVolume(null);
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
        // this.showCashButtons = false;
    };

    @action
    goBack = () => {
        if(this.tabs.includes(this.prevPage)) {
            this.setCurrentTab(this.prevPage);
        }
        const navigateAction = NavigationActions.back();
        this._navigator.dispatch(navigateAction)
        // this.showCashButtons = false;
    };

    @action 
    toggleDrawer() {
        Keyboard.dismiss();
        this._navigator.dispatch(DrawerActions.toggleDrawer());
    }

    @action
    toggleCashButtons() {
        this.showCashButtons = !this.showCashButtons;
    }
}

export default new NavigationStore();