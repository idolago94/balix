import { LoaderStore, NavigationStore } from "../../mobx";

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
        let updateResponse = await this.sendRequest('POST', '/users/updateProfileImage?id=' + user_id, {image});
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

    // Route: /content

    async upload(user_id, upload_obj) {
        let uploadResponse = await this.sendRequest('POST', '/content/upload?id=' + user_id, {file: upload_obj});
        return uploadResponse;
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

    async uploadSecret(user_id, upload_obj) {
        let uploadResponse = await this.sendRequest('POST', '/content/uploadSecret?id=' + user_id, {file: upload_obj});
        return uploadResponse;
    }

    async addSecretView(user_id, content) {
        let updateResponse = await this.sendRequest('PUT', '/content/addSecretView?id=' + user_id, {content});
        return updateResponse;
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

    // Route: /buffer

    async getBuffer(id) {
        if(!id || id == '') {
            return null;
        }
        let bufferResponse = await this.sendRequest('GET', '/buffer/?id=' + id);
        return bufferResponse;
    }

    async getBuffers(ids_array) {
        if(!ids_array || ids_array.length < 1) {
            return [];
        }
        let bufferResponse = await this.sendRequest('GET', '/buffer/some?ids=' + ids_array.join());
        return bufferResponse;
    }

    sendRequest(method, route, body) {
        return new Promise((resolve, reject) => {
            console.log('ApiService -> sendRequest -> ', method, route, body);
            LoaderStore.showLoader();
            // let server_url = 'http://34.69.232.216:8080'; // google server 
            let server_url = 'http://127.0.0.1:8080'; // local server
            fetch(server_url + route, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            .then(res => res.json()).then(response => {
                console.log('Api Response: ', response);
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
}

export default new ApiService();