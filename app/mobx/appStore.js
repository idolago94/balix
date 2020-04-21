import { observable, action, computed } from "mobx";

class AppStore {
    @observable emojis = {};
    @observable videoOnVolume = null;
    @observable animationPlay = null;

    @computed
    get getEmojis() {
        return this.emojis;
    }

    @computed
    get getAnimation() {
        return this.animationPlay;
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

    @action
    setAnimation(lottieJson) {
        console.log('AppStore -> setAnimation');
        this.animationPlay = lottieJson;
    }
}

export default new AppStore();