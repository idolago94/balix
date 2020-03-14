import { observable, action, computed } from "mobx";
import db from "../database/db";
import AuthStore from './authStore'; 

class UsersStore {
    @observable usersStatus = false;
    @observable contentsStatus = false;
    @observable users = [];
    @observable usersContents = [];
    @observable errors = [];

    @computed
    get getUsers() {
        return this.users.slice();
    }

    @computed
    get getContents() {
        return this.usersContents.slice();
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @action
    setUsers(users) {
        console.log('UsersStore -> setUsers -> ', users.length);
        this.usersStatus = true;
        this.users = users;
    }

    @action
    setContents(data) {
        console.log('UsersStore -> setContetnts -> ', data.length);
        this.contentsStatus = true;
        this.usersContents = data;
    }

    @action
    setErrors(...errors) {
        this.usersStatus = false;
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
        console.log('UsersStore -> fetch -> ', users_ids.length + ' users');
        if(users_ids > 0) {
            this.usersStatus = 'PENDING';
            fetch(`${db.url}/users/getUsers?ids=${users_ids.join(',') || ''}`, {
                headers: {'Content-Type': 'application/json', 'Content-Length': '*'},
            }).then(res => res.json()).then(usersResponse => {
                debugger;
                this.setErrors(undefined);
                this.setUsers(usersResponse);
                this.fetchContents();
            }).catch(err => {
                this.setErrors(err);
            })
        } else {
            this.fetchContents();
        }
    }

    @action
    fetchContents() {
        let contents_ids = AuthStore.getUserLogin.uploads.slice();
		this.users.map((user) => {
			contents_ids = contents_ids.concat(user.uploads);
        });
        console.log('UsersStore -> fetch -> ', contents_ids + ' contents');
        this.contentsStatus = 'PENDING';
		fetch(`${db.url}/content/getContents?ids=${contents_ids.join(',')}`)
		.then(res => res.json()).then(contetnsResponse => {
			contetnsResponse.sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate));
			this.setContents(contetnsResponse);
		})
    }
}

export default new UsersStore();