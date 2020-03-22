import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';

class IdentifierStore {
    @persist @observable followingContents = []; // array ids of my following users contents
    @persist @observable topContents = []; // array ids of the top contents
    @persist @observable searchUsers = []; // array ids of the search results users

    @computed
    get getFollowing() {
        return this.followingContents.slice();
    }

    @computed
    get getTop() {
        return this.topContents.slice();
    }

    @computed
    get getSearch() {
        return this.searchUsers.slice();
    }
    
    @action
    setFollowing(ids_array) {
        this.followingContents = ids_array.sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }

    @action
    setTop(ids_array) {
        this.topContents = ids_array;
    }

    @action
    setSearch(ids_array) {
        this.searchUsers = ids_array;
    }
}

export default new IdentifierStore();