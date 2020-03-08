import { observable, action, computed } from "mobx";


class CashButtonsStore {
    @observable visible = false;

    @computed
    get isVisible() {
        return this.visible;
    }

    @action
    toggleButtons() {
        this.visible = !this.visible;
    }

    @action
    hideButtons() {
        this.visible = false;
    }

    @action
    showButtons() {
        this.visible = true;
    }
}

export default new CashButtonsStore();