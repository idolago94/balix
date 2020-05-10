import { observable, action, computed } from "mobx";

class AppStore {
    @observable emojis = {};
    @observable videoOnVolume = null;
    @observable animationPlay = null;
    @observable inappropiateOptions = [];

    @computed
    get getEmojis() {
        return this.emojis;
    }

    @computed
    get getInappropiateOptions() {
        return this.inappropiateOptions;
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
    setInappropiateOptions(data) {
        this.inappropiateOptions = data;
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