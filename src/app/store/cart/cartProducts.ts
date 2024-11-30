import { Phone } from '@/shared/types/Phones/TypePhone.types';
import { makeAutoObservable } from 'mobx';

class CartProducts {
    productStorage: Phone[] = [];
    allSum: number = 0;
    discount: number = 0;
    allSumWithDiscount: number = 0;
    constructor() {
        makeAutoObservable(this);
        if (this.allSum <= 0) {
            this.allSumWithDiscount = 0;
        }
    }

    addToProduct(p: Phone) {
        const isSimilar = this.productStorage.some(p => p.id !== p.id);
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
