import { makeAutoObservable } from 'mobx';

class OrderStore {
    constructor() {
        makeAutoObservable(this);
    }

    toOrderAdd() {}
}

export default new OrderStore();
