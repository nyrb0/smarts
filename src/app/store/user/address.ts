import { makeAutoObservable } from 'mobx';
import user from './user';
import { usersOrder } from '@/shared/types/order/order.type';
import axios from 'axios';

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
            const { data } = await axios(`/api/address`);
            this.addresses = data;
        } catch (err) {
            throw new Error('Ошибка при получение информации адресса');
        }
    }

    async deleteAddress(id: string) {
        try {
            await axios.delete(`/api/address/${id}`);
            this.addresses = this.addresses.filter(f => f.id !== id);
        } catch (err) {
            throw new Error('Ошибка при удалении адресса');
        }
    }
}

export default new UserOrder();
