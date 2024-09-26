import { usersType } from '@/types/User/User.types';
import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';
import { cookieMy } from '@/app/constant/cookie';
import { Phone } from '@/types/Phones/TypePhone.types';

class User {
    userData: string | null = Cookies.get('userData1') || null;
    userFullData: usersType | null = null;
    userAllFullData: usersType[] = [];
    test: usersType[] = [];

    constructor() {
        this.fetchUserData(cookieMy('userData1') || '');
        makeAutoObservable(this);
    }

    search(phone: Phone) {
        const isSimilar = this.userFullData?.saved.some(notSimilar => notSimilar.id === phone.id);
        if (!isSimilar) {
            this.userFullData?.saved.push(phone);
            this.userAllFullData = this.userAllFullData?.filter(f => {
                f.id !== this.userFullData?.id;
            });
            if (this.userFullData) this.userAllFullData?.push(this.userFullData);
        }
    }

    async fetchUserData(d: string) {
        try {
            const res = await fetch('/api/user', {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Error fetching data');
            }
            const data: usersType[] = await res.json();
            const userFind = data.find(use => use.userName === d);
            runInAction(() => {
                this.userFullData = userFind || null;
                this.userAllFullData = data;
            });
        } catch (err) {
            console.log(err);
        }
    }

    removeData(data: usersType) {
        this.userData = null;
        Cookies.remove('userData1');
    }
}

export default new User();
