import { observable, action, computed } from "mobx";


class LoaderStore {
    @observable visible = false;
    @observable loaderRef = undefined;

    @computed
    get isVisible() {
        return this.visible;
    }

    @action
    setLoaderRef(loaderRef) {
        this.loaderRef = loaderRef;
    }

    @action
    hideLoader() {
        this.visible = false;
    }

    @action
    showLoader() {
        this.visible = true;
    }
}

export default new LoaderStore();