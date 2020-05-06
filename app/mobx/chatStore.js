import { observable, action, computed, set, get } from "mobx";
import {persist} from 'mobx-persist';
import { colors } from "../utils/style";
import io from "socket.io-client";
import ApiService from '../Services/Api';
import { AuthStore } from ".";

class ChatStore {
    @observable newMessages = 0;
    @observable socket = io(ApiService.server_url);
    @persist('object') @observable rooms_visit = {}; // { room_id: last_visit }
    @observable rooms = {};
    @observable rooms_ids = [];

    @computed
    get getSocket() {
        return this.socket;
    }

    @computed
    get isNew() {
        return this.newMessages;
    }

    @computed
    get roomHasNew() {
        return (room_id, lastMessage) => !get(this.rooms_visit, room_id) || (new Date(get(this.rooms_visit, room_id)) < new Date(lastMessage));
    }
    @computed
    get getRooms() {
        return this.rooms;
    }

    @computed
    get getRoomsIds() {
        return this.rooms_ids;
    }

    @computed
    get getRoomById() {
        return (id) => get(this.rooms, id);
    }

    @computed
    get hasNewMessages() {
        let counter = 0;
        for(let i=0; i<this.rooms_ids.length; i++) {
            if(!get(this.rooms_visit, this.rooms_ids[i]) || new Date(get(this.rooms, this.rooms_ids[i]).last_message) > new Date(get(this.rooms_visit, this.rooms_ids[i]))) {
                counter++;
            }
        }
        return counter;
    }

    initSocket() {
        this.socket.on(`msg:${AuthStore.getUserLogin._id}`, async(msg) => {
            console.log(msg);
            let updateRooms = await ApiService.getUserRoomsChat();
            this.setRooms(updateRooms);
        });
    }

    @action
    visitRoom(room_id) {
        console.log('visit room', room_id);
        set(this.rooms_visit, room_id, new Date());
    }

    @action
    setRooms(rooms) {
        console.log('ChatStore -> setRooms', rooms.length);
        let update_rooms_ids  = [];
        rooms.map(r => {
            set(this.rooms, r._id, r);
            update_rooms_ids.push(r._id);
        });
        this.rooms_ids = update_rooms_ids;
    }
}

export default new ChatStore();