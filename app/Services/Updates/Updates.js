import ApiService from "../Api";
import { UsersStore, AuthStore, ContentsStore, IdentifierStore, BuffersStore } from "../../mobx";

class UpdateService {

    async checkFollowingUpdates() {
        console.log('UpdateService -> checkFollowingUpdates');
        // fetch all users as param (array of {content_id, lastUpdate, uploadDate})
        let user_check = AuthStore.getUserLogin.following.slice();
        user_check.push(AuthStore.getUserLogin._id);
        let fetch_users = await ApiService.getUsers(user_check);
        // check if there is content update at any user
        let contents_to_update_ids = [];
        let content_ids = [];
        fetch_users.map(user => {
            user.uploads.map(up => {
                content_ids.push(up);
                let content_from_store = ContentsStore.getContentById(up.content_id);
                if(!content_from_store || new Date(up.lastUpdate) > new Date(content_from_store.lastUpdate)) {
                    contents_to_update_ids.push(up.content_id);
                }
            });
        });
        let contents = await ApiService.getSomeContents(contents_to_update_ids);
        let buffers_ids = []
        contents.map(c => {
            if(!ContentsStore.getContentById(c._id)) {
                buffers_ids.push(c.buffer_id);
            }
        });
        let buffers = await ApiService.getBuffers(buffers_ids);
        ContentsStore.setContents(contents);
        UsersStore.setUsers(fetch_users);
        BuffersStore.setBuffers(buffers);
        IdentifierStore.setFollowing(content_ids);
    }
}

export default new UpdateService();