import { observable, action, computed, set, get } from "mobx";
import db from "../database/db";
import { persist } from "mobx-persist";


class ActionsStore {
    @observable status = false;
    @persist('object') @observable actions = {};
    @observable errors = [];

    @computed
    get getActionById() {
        return (id) => get(this.actions, id);
    }

    @computed
    get getErrors() {
        return this.errors.slice();
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
    fetchUserActions(user_id) {
        console.log('ActionsStore -> fetch -> ', user_id);
        this.status = 'PENDING';
        fetch(`${db.url}/actions/getActions?id=${user_id}`, {
            headers: {'Content-Type': 'application/json', 'Content-Length': '*'},
        }).then(res => res.json()).then(actionsResponse => {
            this.setErrors([]);
            this.setActions(actionsResponse);
        }).catch(err => {
            this.setErrors(err);
        })
    }
}

export default new ActionsStore();