import { observable, action, computed } from "mobx";

class AppStore {
    @observable emojis = {};

    @computed
    get getEmojis() {
        return this.emojis;
    }

    @action
    setEmojis(data) {
        console.log('AppStore -> setEmojis', data);
        this.emojis = data;
    }
}

export default new AppStore();