import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';
import { clearSearch } from "../store/search/searchActions";

class IdentifierStore {
    @persist @observable followingContents = []; // array ids of my following users contents
    @persist @observable topContents = []; // array ids of the top contents
    @persist @observable searchUsers = []; // array ids of the search results users
    @observable handleSearch = false;
    
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

    @computed
    get isHandleSearch() {
        return this.handleSearch;
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
        this.handleSearch = true;
        this.searchUsers = ids_array;
    }

    @action
    clearSearch() {
        this.searchUsers = [];
        this.handleSearch = false;
    }
 }

export default new IdentifierStore();