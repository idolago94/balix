import { LoaderStore, NavigationStore } from "../../mobx";
import { Platform } from 'react-native';
import CompressService from "../Compress";
import ValidationService from "../Validation";

class ApiService {

    // Route: /users

    async login(username, password) {
        if(!username || username == '' || !password || password == '') {
            return {error: 'All fields required.'};
        }
        let loginResponse = await this.sendRequest('POST', '/users/login', {username, password});
        return loginResponse;
    }

    async getUser(user_id) {
        if(!user_id) {
            return []
        }
        let userResponse = await this.sendRequest('GET', '/users/getSingleUser?id=' + user_id);
        return userResponse;
    }

    async getUsers(ids_array) {
        if(!ids_array || ids_array.length < 1) {
            return []
        }
        let usersResponse = await this.sendRequest('GET', '/users/getUsers?ids=' + ids_array.join(','));
        return usersResponse;
    }

    async getAllUsers() {
        let usersResponse = await this.sendRequest('GET', '/users/getAll');
        return usersResponse;
    }

    async signup(first_name, last_name, username, password, email, gender) {
        let newUser = {first_name, last_name, username, password, email, gender};
        let signResponse = await this.sendRequest('POST', '/users/signup', newUser);
        return signResponse;
    }

    async startFollow(user_id, user_follow) {
        let followResponse = await this.sendRequest('PUT', '/users/startFollow?id=' + user_id, {user: user_follow});
        return followResponse;
    }

    async stopFollow(user_id, user_stop_follow) {
        let followResponse = await this.sendRequest('PUT', '/users/stopFollow?id=' + user_id, {user: user_stop_follow});
        return followResponse;
    }

    async buyPackage(user_id, cost, recieve_obj) {
        let buyResponse = await this.sendRequest('POST', '/users/buyPackage?id=' + user_id, {recieve: recieve_obj, cost});
        return buyResponse;
    }

    async updateProfileImage(user_id, image) {
        if(!user_id || !image) {
            return null;
        }
        let resizedImage = await CompressService.buildProfileImage(image);
        let data = new FormData();
        data.append('file', {
            name: resizedImage.name,
            uri:
              Platform.OS === "android" ? resizedImage.uri : resizedImage.uri.replace("file://", "")
        })
        let updateResponse = await this.sendUploadRequest('/users/updateProfileImage?id=' + user_id, data);
        return updateResponse;
    }

    async updateKeywords(user_id, keywords_array) {
        if(!keywords_array || keywords_array.length < 1) {
            return null;
        }
        let keywordsResponse = await this.sendRequest('PUT', '/users/updateKeywords?id=' + user_id, {keywords: keywords_array});
        return keywordsResponse;
    }

    async addExtraContent(user_id, cost) {
        let extraResponse = await this.sendRequest('PUT', '/users/addExtra?id=' + user_id, {cost});
        return extraResponse;
    }

    async updateUser(user_id, fields_to_update) {
        if(!fields_to_update || fields_to_update.length < 1) {
            return null;
        }
        let validation = ValidationService.edit(fields_to_update);
        if(validation) {
            return validation;
        }
        let updateResponse = await this.sendRequest('PUT', '/users/update?id=' + user_id, fields_to_update);
        return updateResponse;
    }

    // Route: /content

    async upload(user_id, content, extraData) {
        let upload_obj = await CompressService.compressFile(content);
        let data = new FormData();
        data.append('file', {
            name: upload_obj.name,
            type: content.type || 'video/mp4',
            uri:
              Platform.OS === "android" ? upload_obj.uri : upload_obj.uri.replace("file://", "")
        })
        Object.keys(extraData).map(k => data.append(k, extraData[k]));
        let updateResponse = await this.sendUploadRequest(`/content/upload?id=${user_id}`, data);
        return updateResponse;
    }

    async getAllContents() {
        let contentsResponse = await this.sendRequest('GET', '/content/getAll');
        return contentsResponse;
    }

    async updateContent(user_id, content_id, achievements) {
        let updateResponse = await this.sendRequest('PUT', '/content/update?id=' + user_id, {content_id, achievements});
        return updateResponse;
    }

    async getUserContents(user_id) {
        if(!user_id) {
            return null
        }
        let contentsResponse = await this.sendRequest('GET', '/content/userContent?id=' + user_id);
        return contentsResponse;
    }

    async getSomeContents(ids_array) {
        if(!ids_array || ids_array.length < 1) {
            return [];
        }
        let contentsResponse = await this.sendRequest('GET', '/content/getContents?ids=' + ids_array.join());
        return contentsResponse;
    }

    async uploadSecret(user_id, content, extraData) {
        let upload_obj = await CompressService.compressFile(content);
        let data = new FormData();
        data.append('file', {
            name: upload_obj.name,
            type: content.type,
            uri:
              Platform.OS === "android" ? upload_obj.uri : upload_obj.uri.replace("file://", "")
        });
        Object.keys(extraData).map(k => data.append(k, extraData[k]));
        let updateResponse = await this.sendUploadRequest(`/content/upload?id=${user_id}&secret=true`, data);
        return updateResponse;
    }

    async addSecretView(user_id, content) {
        console.log('ApiService -> addSecretView', content);
        let updateResponse = await this.sendRequest('PUT', '/content/addSecretView?id=' + user_id, {content});
        return updateResponse;
    }

    async getTopContents() {
        let topResponse = await this.sendRequest('GET', '/content/top');
        return topResponse;
    }

    // Route: /actions

    async getUserActions(user_id) {
        if(!user_id || user_id == '') {
            return [];
        }
        let actionsResponse = await this.sendRequest('GET', '/actions/getActions?id=' + user_id);
        return actionsResponse;
    }

    async getActionsTypes() {
        let typesResponse = await this.sendRequest('GET', '/actions/type');
        return typesResponse;
    }

    // Route: /search

    async handleSearch(word) {
        if(!word || word.length < 3) {
            return [];
        }
        let searchResponse = await this.sendRequest('GET', '/search/?word=' + word);
        return searchResponse;
    }

    // Route: /comment
    async getContentComments(content_id) {
        let commentsResponse = await this.sendRequest('GET', '/comment/content?id=' + content_id);
        return commentsResponse;
    }

    async sendComment(user_id, content_id, comment) {
        let sendResponse = await this.sendRequest('POST', '/comment/add?id=' + user_id, {content_id, comment});
        return sendResponse;
    }

    async getEmojis() {
        let emojisResponse = await this.sendRequest('GET', '/emoji_urls');
        return emojisResponse;
    }

    // erver_url = 'http://34.69.232.216:8080'; // google server 
    server_url = 'http://127.0.0.1:8080'; // local server

    sendRequest(method, route, body) {
        return new Promise((resolve, reject) => {
            console.log('ApiService -> sendRequest -> ', method, route, body);
            LoaderStore.showLoader();
            fetch(this.server_url + route, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            .then(res => res.json()).then(response => {
                console.log('Api Response: ', response.toString().slice(0, 100));
                LoaderStore.hideLoader();
                resolve(response);
            })
            .catch(err => {
                LoaderStore.hideLoader();
                NavigationStore.setBanner(err.message);
                // resolve({error: err.message});
            });
        });
    }

    sendUploadRequest(route, body) {
        return new Promise((resolve, reject) => {
            console.log('ApiService -> sendRequest -> ', route, body);
            LoaderStore.showLoader();
            fetch(this.server_url + route, {
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                body: body
            })
            .then(res => res.json()).then(response => {
                console.log('Api Response: ', response.toString().slice(0, 100));
                LoaderStore.hideLoader();
                resolve(response);
            })
            .catch(err => {
                LoaderStore.hideLoader();
                NavigationStore.setBanner(err.message);
            });
        });
    }
}

export default new ApiService();