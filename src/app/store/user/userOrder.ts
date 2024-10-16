import { makeAutoObservable } from 'mobx';
import user from './user';
import { usersOrder, usersType } from '@/shared/types/User/User.types';

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
            const res = await fetch(`/api/user/af6e`, {
                method: 'GET',
            });
            const data: usersType = await res.json();
            this.addresses.push(data.order);
        } catch (err) {
            throw new Error('Ошибка');
        }
    }
}

export default new UserOrder();
