import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';
import Style from '../helpers/style/style';

class GraphStore {
    @persist @observable mostVolunteers = [];
    @persist @observable gendersData = [
        {count: 0, color: Style.colors.darkMain, label: 'Male'},
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
            {count: data.male, color: Style.colors.darkMain, label: 'Male'},
            {count: data.female, color: "#993188", label: 'Female'}
        ]
    }
 }

export default new GraphStore();