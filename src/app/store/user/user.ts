import { usersType } from '@/types/User/User.types';
import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

class User {
    userData: usersType | null = null;
    constructor() {
        const storedData = Cookies.get('userData1');
        if (storedData) {
            try {
                this.userData = JSON.parse(storedData);
            } catch (err) {
                console.log('Ошибка при парсинге', err);
            }
        }
        makeAutoObservable(this);
    }
    removeData(data: usersType) {
        this.userData = null;
        Cookies.remove('userData1');
    }
}

export default new User();
