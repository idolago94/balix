import ApiService from "../Api";
import { UsersStore, AuthStore, ContentsStore, IdentifierStore, BuffersStore, ActionsStore, GraphStore, NavigationStore } from "../../mobx";

class UpdateService {

    async checkFollowingUpdates() {
        console.log('UpdateService -> checkFollowingUpdates');
        NavigationStore.setProgress(true);
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
        ContentsStore.setContents(contents);
        UsersStore.setUsers(fetch_users);
        IdentifierStore.setFollowing(content_ids);
        NavigationStore.setProgress(false);
    }

    async updateActions() {
        console.log('UpdateService -> updateActions');
        let actions = await ApiService.getUserActions(AuthStore.getUserLogin._id);
        this.updateGraphs(actions);
        ActionsStore.setActions(actions);
        let actions_ids = actions.map(act => act._id);
        IdentifierStore.setActions(actions_ids);
    }

    async updateGraphs(actions) {
        let volunteers = []; // {id, amount}[]
        actions.map(act => {
            if(act.disactive_user_id == AuthStore.getUserLogin._id && act.type == 0) {
                // get emoji actions
                let index = volunteers.findIndex(v => v.user_id == act.active_user_id);
                if (index == -1) {
                    volunteers.push({
                        user_id: act.active_user_id,
                        amount: act.emoji.value
                    });
                } else {
                    volunteers[index] = {user_id: act.active_user_id, amount: volunteers[index].amount + act.emoji.value};
                }
            }
            if(act.disactive_user_id == AuthStore.getUserLogin._id && act.type == 3) {
                // get hearts actions
            }
        });
        let volunteers_ids = volunteers.map(v => v.user_id);
        let users = await ApiService.getUsers(volunteers_ids);
        let gendersData = {male: 0, female: 0};
        users.map(u => {
            u.gender == 'Female' && gendersData.female++;
            u.gender == 'Male' && gendersData.male++;
        });
        volunteers.sort((a, b) => b.amount - a.amount);
        GraphStore.setMostVolunteers(volunteers);
        GraphStore.setGendersData(gendersData);
    }

    async updateTop() {
        console.log('UpdateService -> updateTop');
        NavigationStore.setProgress(true);
        let topResponse = await ApiService.getTopContents();
        let top_ids = topResponse.map(t => ({content_id: t._id}));
        ContentsStore.setContents(topResponse);
        IdentifierStore.setTop(top_ids);
        NavigationStore.setProgress(false);
    }
}

export default new UpdateService();