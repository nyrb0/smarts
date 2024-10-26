import { makeAutoObservable } from 'mobx';
import user from './user';
import { usersOrder } from '@/shared/types/order/order.type';

class UserOrder {
    addresses: usersOrder[] = [];
    userId: string = '';

    constructor() {
        this.userId = user.userFullData?.id || '';
        makeAutoObservable(this);
        this.getAddressesUser();
    }

    async getAddressesUser() {
        try {
            const res = await fetch(`/api/address`);
            const data = await res.json();
            this.addresses = data;
        } catch (err) {
            throw new Error('Ошибка при получение информации адресса');
        }
    }
}

export default new UserOrder();
