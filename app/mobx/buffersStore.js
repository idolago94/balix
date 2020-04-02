import { observable, action, computed, get, set } from "mobx";
import {persist} from 'mobx-persist';

class BuffersStore {
    @persist('object') @observable buffers = {};
    @observable errors = [];

    @computed
    get getBuffers() {
        return this.buffers;
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @computed
    get getBase64() {
        return (id) => get(this.buffers, id);
    }

    @action
    async setBuffers(buf_array) {
        console.log('BuffersStore -> setBuffer');
        buf_array.map(buf => set(this.buffers, buf._id, buf.data));
    }

    @action
    updateContent(id, data) {
        this.contents[id] = {...data};
    }

    @action
    setErrors(...errors) {
        this.status = false;
        this.errors = errors;
    }
}

export default new BuffersStore();