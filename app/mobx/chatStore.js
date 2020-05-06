import { observable, action, computed } from "mobx";
import {persist} from 'mobx-persist';
import { colors } from "../utils/style";
import io from "socket.io-client";
import ApiService from '../Services/Api';
import { AuthStore } from ".";

class ChatStore {
    @observable newMessages = 0;
    @observable socket = io(ApiService.server_url);
        
    // this.socket = 
    // this.socket.on(`msg:${this.props.AuthStore.getUserLogin._id}`, msg => {
    //   console.log(msg);
    // });

    @computed
    get getSocket() {
        return this.socket;
    }

    @computed
    get isNew() {
        return this.newMessages > 0 ? this.newMessages:false;
    }

    initSocket() {
        this.socket.on(`msg:${AuthStore.getUserLogin._id}`, msg => {
            console.log(msg);
            this.newMessages ++;
        });
    }
}

export default new ChatStore();