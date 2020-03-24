import { observable, action, computed, set, get } from "mobx";
import {persist} from 'mobx-persist';
import bufferToBase64 from '../helpers/convert/Buffer';
import ApiService from "../Services/Api";

class ContentsStore {
    @persist('object') @observable contents = {};
    @observable errors = [];

    @computed
    get getContents() {
        return this.contents;
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @computed
    get getUserContents() {
        return (user_id) => this.contents.filter(c => c.user_id == user_id);
    }

    @computed
    get getContentById() {
        return (id) => get(this.contents, id);
    }

    @action
    async setContents(contents) {
        console.log('ContentsStore -> setContents -> ', contents.length);
        contents.map(c => set(this.contents, c._id, c));
    }

    convertContentsArrayToObject(arr) {
        return new Promise(resolve => {
            let contentsObj = {};
            arr.forEach(c => {
                contentsObj[c._id] = {...c};
            });
            resolve(contentsObj);
        })
    }

    @action
    updateContent(id, data) {
        this.contents[id] = {...this.contents[id], ...data};
    }

    @action
    setErrors(...errors) {
        this.status = false;
        this.errors = errors;
    }
}

export default new ContentsStore();