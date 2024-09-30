import { usersType } from '@/shared/types/User/User.types';
import { makeAutoObservable, runInAction } from 'mobx';
import Cookies from 'js-cookie';
import { cookieMy } from '@/Features/cookie';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import axios from 'axios';

class User {
    userData: string | null = Cookies.get('userData1') || null;
    userFullData: usersType | null = null;
    userAllFullData: usersType[] = [];
    theUser: usersType | null = null;

    constructor() {
        this.fetchUserData(cookieMy('userData1') || '');
        this.getUser();
        makeAutoObservable(this);
    }

    like(p: Phone) {
        const isSimilar = this.userFullData?.saved.some(notSimilar => notSimilar.id === p.id);
        if (isSimilar) return;
        this.userFullData?.saved.push(p);
        if (this.userFullData) {
            this.liked([...this.userFullData.saved, ...this.userFullData.saved]);
        }
    }

    unLike(p: Phone) {
        const del = this.userFullData?.saved.filter(d => d.id !== p.id);
        if (del) this.liked(del);
    }

    async liked(users: Phone[]) {
        try {
            console.log('Отправляемые данные:', this.userAllFullData);
            if (!this.userFullData) return;
            await fetch(`/api/user/${this.userFullData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ saved: users }),
            });
            runInAction(() => {
                this.fetchUserData(cookieMy('userData1') || '');
            });
        } catch (e) {
            throw e;
        }
    }
    async unLiked(user: usersType) {
        try {
            console.log('Отправляемые данные:', this.userAllFullData);
            if (!this.userFullData) return;
            await fetch(`/api/user/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ saved: [...this.userFullData.saved, user.saved] }),
            });
            runInAction(() => {
                this.fetchUserData(cookieMy('userData1') || '');
            });
        } catch (e) {
            throw e;
        }
    }

    async getUser() {
        const fet = await axios('/api/user');
        this.theUser = fet.data;
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
