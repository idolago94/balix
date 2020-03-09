import { observable, action, computed } from "mobx";
import db from "../database/db";
import { updateUserLogin } from "../store/auth/authActions";


class UsersStore {
    @observable status = false;
    @observable users = [];
    @observable errors = [];

    @computed
    get getUsers() {
        return this.users.slice();
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @action
    setUsers(users) {
        console.log('UsersStore -> setUsers -> ', users.length);
        this.status = true;
        this.users = users;
    }

    @action
    setErrors(...errors) {
        this.status = false;
        this.errors = errors;
    }

    @action
    updateUser(user_id, field_to_update) {
        this.users.forEach(u => {
            if(u._id == user_id) {
                return Object.assign(u, field_to_update);
            }
        })
    }

    @action
    fetchUsers(users_ids) {
        console.log('ActionsStore -> fetch -> ', user_id);
        this.status = 'PENDING';
        fetch(`${db.url}/users/getUsers?ids=${users_ids.join(',') || ''}`, {
            headers: {'Content-Type': 'application/json', 'Content-Length': '*'},
        }).then(res => res.json()).then(usersResponse => {
            this.setErrors(undefined);
            this.setActions(usersResponse);
        }).catch(err => {
            this.setErrors(err);
        })
    }
}

export default new UsersStore();