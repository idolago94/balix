import { observable, action, computed } from "mobx";
import db from "../database/db";


class ActionsStore {
    @observable status = false;
    @observable actions = [];
    @observable errors = [];

    @computed
    get getActions() {
        return this.actions.slice();
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @action
    setActions(actions) {
        console.log('ActionsStore -> setActions -> ', action.length);
        this.status = true;
        this.actions = actions;
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