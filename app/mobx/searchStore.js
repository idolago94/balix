import { observable, action, computed } from "mobx";
import db from "../database/db";


class SearchStore {
    @observable status = false;
    @observable searchResult = [];
    @observable errors = [];

    @computed
    get getResults() {
        return this.searchResult.slice();
    }

    @computed
    get getErrors() {
        return this.errors.slice();
    }

    @computed
    get getStatus() {
        return this.status;
    }

    @action
    setResults(results) {
        console.log('SearchStore -> setResults -> ', results.length);
        this.status = true;
        this.searchResult = results;
    }

    @action
    setErrors(...errors) {
        console.log('SearchStore -> setErrors -> ', errors)
        this.status = false;
        this.errors = errors;
    }

    @action
    clearResults() {
        this.setResults([]);
    }

    @action
    handleSearch(word) {
        console.log('SearchStore -> handleSearch -> ', word);
        this.status = 'PENDING';
        fetch(`${db.url}/search/?word=${word}`)
        .then(res => res.json()).then(searchResponse => {
            this.setErrors([]);
            this.setResults(searchResponse);
        }).catch(err => {
            this.setErrors(err);
        })
    }
}

export default new SearchStore();