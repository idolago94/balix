import ApiService from "../Api";
import { UsersStore } from "../../mobx";
import ContentsStore from "../../mobx/contentsStore";

class UpdateService {

    async checkUpdates(users) {
        // fetch all my following users / users as param 
        let fetch_users = await ApiService.getUsers(Object.keys(users));
        UsersStore.setUsers(fetch_users);
        // check if there is content update at any user
        let users_to_update = fetch_users.filter(u => new Date(u.lastContentUpdate) > new Date(users[u._id].lastContentUpdate));
        // true - fetch contents
        if(users_to_update.length > 0) {
            let content_arr = [];
            users_to_update.map(u => content_arr.concat(u.uploads));
            let contents = await ApiService.getSomeContents(content_arr);
            ContentsStore.setContents(contents);
        }
        // false - null
    }
}

export default new UpdateService();