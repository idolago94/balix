import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';

class GraphStore {
    @persist @observable mostVolunteers = [];
    
    // GET

    @computed
    get get14MostVolunteers() {
        return this.mostVolunteers.slice(0, 15);
    }

    // SET

    @action
    setMostVolunteers(volunteers_array) {
        this.mostVolunteers = volunteers_array;
    }
 }

export default new GraphStore();