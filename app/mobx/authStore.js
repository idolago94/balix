import { observable, action, computed, get, set } from "mobx";
import db from "../database/db";
import ApiService from "../Services/Api";
import { UsersStore } from ".";

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

    @computed
    get isMyId() {
        return (id) => this.userLogin._id == id;
    }

    @computed
    get isFollow() {
        return (id) => get(this.userLogin, 'following').find(f => f == id);
    }

    @action
    setUserLogin(user) {
        console.log('authStore -> setUserLogin -> ', user._id);
        this.status = true;
        this.userLogin = user;
    }

    @action
    setErrors(...errors) {
        console.log('AuthStore -> setErrors -> ', errors)
        this.status = false;
        this.errors = errors;
    }

    @action
    async login(authData) {
        console.log('authStore -> login -> ', authData.username);
        this.status = 'PENDING';
        let auth = await ApiService.login(authData.username, authData.password);
        auth._id && this.setUserLogin(auth);
    }

    @action
    updateUserLogin(field_to_update) {
        set(this.userLogin, field_to_update);
    }

    @action
    logout() {
        this.setUserLogin(undefined);
    }
}

export default new AuthStore();