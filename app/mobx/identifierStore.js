import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';

class IdentifierStore {
    @observable followingContents = []; // array ids of my following users contents
    @observable topContents = []; // array ids of the top contents
    @observable searchUsers = []; // array ids of the search results users
    @observable actions = [];
    @observable mostVolunteers = [];
    @observable handleSearch = false;
    
    // GET

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
    get getActions() {
        return this.actions.slice();
    }

    @computed
    get get14MostVolunteers() {
        return this.mostVolunteers.slice(0, 15);
    }

    @computed
    get isHandleSearch() {
        return this.handleSearch;
    }

    // SET
    
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
    setActions(ids_array) {
        this.actions = ids_array;
    }

    @action
    setMostVolunteers(volunteers_array) {
        this.mostVolunteers = volunteers_array;
    }

    // Actions

    @action
    clearSearch() {
        this.searchUsers = [];
        this.handleSearch = false;
    }
 }

export default new IdentifierStore();