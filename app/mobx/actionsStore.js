import { observable, action, computed, set, get } from "mobx";
import db from "../database/db";
import { persist } from "mobx-persist";


class ActionsStore {
    @observable status = false;
    @persist('object') @observable actions = {};
    @observable types = {};
    @observable errors = [];

    @computed
    get getActionById() {
        return (id) => get(this.actions, id);
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @computed
    get getTypes() {
        return this.types;
    }

    @action
    setActions(actions) {
        console.log('ActionsStore -> setActions -> ', actions.length);
        actions.map(act => set(this.actions, act._id, act));
    }

    @action
    setErrors(...errors) {
        this.status = false;
        this.errors = errors;
    }

    @action
    setTypes(data) {
        console.log('ActionsStore -> setTypes -> ', data);
        this.types = data;
    }
}

export default new ActionsStore();