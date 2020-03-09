import { observable, action, computed } from "mobx";
import { persist } from 'mobx-persist'
import { NavigationActions } from 'react-navigation';

class NavigationStore {
    @observable _navigator = null;
    @observable prevPage = null;
    @observable currentScreen = null;

    //GET

    @computed
    get getCurrentScreen() {
        return this.currentScreen;
    }
    
    @computed
    get getPrevPage() {
        return this.prevPage;
    }

    //SET

    @action
    setMainNavigation(data) {
        this._navigator = { ...data }
    }

    @action
    updateCurrentScreen = (data) => {
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
        this._navigator.dispatch(navigateAction)
    };

    @action
    goBack = () => {
        const navigateAction = NavigationActions.back();
        this._navigator.dispatch(navigateAction)
    };
}

export default new NavigationStore();