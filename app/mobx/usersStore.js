import { observable, action, computed, set, get } from "mobx";
import {persist} from 'mobx-persist';
import ApiService from "../Services/Api";

class UsersStore {
    @observable usersStatus = false;
    @observable users = {};
    @observable errors = [];

    @computed
    get getUsers() {
        return this.users;
    }

    @computed
    get getUserById() {
        return (id) => get(this.users, id);
    }

    @computed
    get getErrors() {
        return this.errors;
    }

    @action
    async setUsers(users) {
        console.log('UsersStore -> setUsers -> ', users.map(u => u.username));
        this.usersStatus = true;
        users.map(u => set(this.users, u._id, u));
    }

    @action
    setErrors(...errors) {
        this.usersStatus = false;
        this.errors = errors;
    }

    @action
    updateUser(user_id, field_to_update) {
        this.users[user_id] = {...this.users[user_id], ...field_to_update};
    }
}

export default new UsersStore();