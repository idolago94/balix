import { observable, action, computed, set, get } from "mobx";
import {persist} from 'mobx-persist';
import { colors } from "../utils/style";
import io from "socket.io-client";
import ApiService from '../Services/Api';
import { AuthStore } from ".";

class ChatStore {
    @observable newMessages = 0;
    @observable socket = io(ApiService.server_url);
    // @persist('object') @observable rooms_visit = {}; // { room_id: last_visit }
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
        // return (room_id, lastMessage) => !get(this.rooms_visit, room_id) || (new Date(get(this.rooms_visit, room_id)) < new Date(lastMessage));
        return (room_id) => !AuthStore.getChatRooms || !AuthStore.getChatRooms[room_id] ||
                        new Date(get(this.rooms, room_id).last_message) > new Date(AuthStore.getChatRooms[room_id]);
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
            if(this.roomHasNew(this.rooms_ids[i])) {
                counter++;
            }
        }
        return counter;
    }

    initSocket() {
        this.socket.on(`update_room:${AuthStore.getUserLogin._id}`, (update_room) => {
            console.log('update room from socket', update_room);
            this.setRooms([update_room]);
        });
    }

    @action
    setRooms(rooms) {
        console.log('ChatStore -> setRooms', rooms.length);
        rooms.map(r => {
            set(this.rooms, r._id, r);
            !this.rooms_ids.includes(r._id) && this.rooms_ids.push(r._id);
        });
    }
}

export default new ChatStore();