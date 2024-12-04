import { OrderType, usersOrder } from '@/shared/types/order/order.type';
import { makeAutoObservable } from 'mobx';

class Order {
    private order: OrderType | null = null;
    constructor() {
        makeAutoObservable(this);
    }
    set change(body: any) {
        this.order = body;
    }

    get change() {
        return this.order;
    }
}

export default new Order();
