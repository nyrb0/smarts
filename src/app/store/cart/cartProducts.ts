import { Phone } from '@/types/Phones/TypePhone.types';
import { makeAutoObservable } from 'mobx';

class CartProducts {
    productStorage: Phone[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    addToProduct(p: Phone) {
        if (!this.productStorage.length) {
            this.productStorage.push(p);
            return;
        }
        const isSimilar = this.productStorage.find(p => p.id === p.id);
        if (!isSimilar) {
            this.productStorage.push(p);
        }
    }
    deleteProduct(p: Phone) {
        const theDelete = this.productStorage.filter(pro => pro.id !== p.id);
        this.productStorage = theDelete;
    }
}
export default new CartProducts();
