import { observable, action, computed, get, set } from "mobx";
import ApiService from "../Services/Api";
import { persist } from "mobx-persist";
import ValidationService from "../Services/Validation";
import { UsersStore } from ".";

class AuthStore {
    @observable status = false;
    @persist('object') @observable userLogin = undefined;
    @observable errors = [];
    @persist @observable token = null;

    @computed
    get getUserLogin() {
        return Object.assign({}, this.userLogin);
    }

    @computed
    get getToken() {
        return this.token;
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

    @computed
    get getChatRooms() {
        return get(this.userLogin, 'chat_rooms');
    }

    @action
    setUserLogin(auth) {
        console.log('authStore -> setUserLogin -> ', auth);
        this.status = true;
        this.setErrors([]);
        UsersStore.setUsers([auth.user]);
        this.userLogin = auth.user;
        this.token = auth.token;
    }

    @action
    setToken(token) {
        this.token = token;
    }

    @action
    setErrors(errors) {
        console.log('AuthStore -> setErrors -> ', errors)
        this.status = false;
        this.errors = errors;
    }

    @action
    async login(authData) {
        console.log('authStore -> login -> ', authData.username);
        let validate = ValidationService.login(authData);
        if(validate) {
            this.setErrors(validate);
        } else {
            this.status = 'PENDING';
            let auth = await ApiService.login(authData.username, authData.password);
            auth.token && this.setUserLogin(auth);
            auth.error && this.setErrors([auth.error]);
        }
    }

    @action
    updateUserLogin(field_to_update) {
        console.log('AuthStore -> updateUserLogin -> ', field_to_update);
        UsersStore.updateUser(this.userLogin._id, field_to_update);
        // this.userLogin = {...this.userLogin, ...field_to_update};
        set(this.userLogin, field_to_update);
    }

    @action
    logout() {
        this.setUserLogin({user: undefined, token: null});
    }
}

export default new AuthStore();