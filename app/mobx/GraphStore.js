import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';
import { colors } from "../utils/style";

class GraphStore {
    @observable mostVolunteers = [];
    @observable gendersData = [
        {count: 0, color: colors.darkMain, label: 'Male'},
        {count: 0, color: "#993188", label: 'Female'}
    ];
    
    // GET

    @computed
    get get14MostVolunteers() {
        return this.mostVolunteers.slice(0, 15);
    }

    @computed
    get getGendersData() {
        return this.gendersData.slice();
    }

    // SET

    @action
    setMostVolunteers(volunteers_array) {
        this.mostVolunteers = volunteers_array;
    }

    @action
    setGendersData(data) {
        this.gendersData = [
            {count: data.male, color: colors.lightMain, label: 'Male'},
            {count: data.female, color: "#df1bb5", label: 'Female'}
        ]
    }
 }

export default new GraphStore();