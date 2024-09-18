import { makeAutoObservable } from 'mobx';

class Global {
    selecred: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSelected(s: string) {
        this.selecred = s;
    }
}

export default new Global();
