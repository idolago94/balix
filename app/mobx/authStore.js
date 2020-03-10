import { observable, action, computed } from "mobx";
import db from "../database/db";

class AuthStore {
    @observable status = false;
    @observable userLogin = undefined;
    @observable errors = [];

    @computed
    get getUserLogin() {
        return Object.assign({}, this.userLogin);
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @action
    setUserLogin(user) {
        console.log('authStore -> setUserLogin -> ', user._id);
        this.status = true;
        this.userLogin = user;
    }

    @action
    setErrors(...errors) {
        this.status = false;
        this.errors = errors;
    }

    @action
    login(authData) {
        console.log('authStore -> login -> ', authData.username);
        this.status = 'PENDING';
        fetch(`${db.url}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Content-Length': '*'},
            body: JSON.stringify(authData)
        }).then(res => res.json()).then(authResponse => {
            if(authResponse._id) {
                this.setErrors(undefined);
                this.setUserLogin(authResponse);
            }
            else {
                this.setErrors(response.err);
            }
        }).catch(err => {
            this.setErrors(err);
        })
    }

    @action
    updateUserLogin(field_to_update) {
        let updatedUser = Object.assign(this.userLogin, field_to_update);
        this.setUserLogin(updatedUser);
    }

    @action
    logout() {
        this.setUserLogin(undefined);
    }
}

export default new AuthStore();