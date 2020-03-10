import { observable, action, computed } from "mobx";
import db from "../database/db";
import { updateUserLogin } from "../store/auth/authActions";


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
        return this.contents.slice();
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
    setContetnts(data) {
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
        console.log('UsersStore -> fetch -> ', user_id);
        this.usersStatus = 'PENDING';
        fetch(`${db.url}/users/getUsers?ids=${users_ids.join(',') || ''}`, {
            headers: {'Content-Type': 'application/json', 'Content-Length': '*'},
        }).then(res => res.json()).then(usersResponse => {
            this.setErrors(undefined);
            this.setUsers(usersResponse);
            this.fetchContents();
        }).catch(err => {
            this.setErrors(err);
        })
    }

    @action
    fetchContents() {
		let contents_ids = [];
		this.users.map((user) => {
			contents_ids = contents_ids.concat(user.uploads);
        });
        this.contentsStatus = 'PENDING';
		fetch(`${db.url}/content/getContents?ids=${contents_ids.join(',')}`)
		.then(res => res.json()).then(contetnsResponse => {
			let contents = contetnsResponse.concat(auth.userLogin.uploads);
			contents.sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate));
			this.setContents(contents);
		})
    }
}

export default new UsersStore();