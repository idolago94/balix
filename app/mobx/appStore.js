import { observable, action, computed } from "mobx";

class AppStore {
    @observable emojis = {};
    @observable videoOnVolume = null;

    @computed
    get getEmojis() {
        return this.emojis;
    }

    @computed
    get inVolume() {
        return (video) => video == this.videoOnVolume;
    }

    @action
    setEmojis(data) {
        console.log('AppStore -> setEmojis', data);
        this.emojis = data;
    }

    @action
    setVideoVolume(video) {
        this.videoOnVolume = video;
    }
}

export default new AppStore();