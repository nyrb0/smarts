import { makeAutoObservable } from 'mobx';

class Global {
    selecred: string = 'popular';

    constructor() {
        makeAutoObservable(this);
    }

    setSelected(s: string) {
        this.selecred = s;
    }
}

export default new Global();
