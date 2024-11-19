import { usersType } from '@/shared/types/User/User.types';
import { makeAutoObservable, runInAction } from 'mobx';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import axios from 'axios';

interface HandleServerUserParams {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT';
    error: string;
}

class User {
    userData: string | null = localStorage.getItem('userData1') || null;
    userFullData: usersType | null = null;
    userAllFullData: usersType[] = [];
    theUser: usersType | null = null;

    constructor() {
        makeAutoObservable(this);
        this.fetchUserData(localStorage.getItem('userData1') || '');
        this.getUser();
    }

    like(p: Phone) {
        const isSimilar = this.userFullData?.saved.some(notSimilar => notSimilar.id === p.id);
        if (isSimilar) return;
        this.userFullData?.saved.push(p);
        if (this.userFullData) {
            this.liked(this.userFullData.saved);
        }
    }

    unLike(p: Phone) {
        const del = this.userFullData?.saved.filter(d => d.id !== p.id);
        if (del) this.liked(del);
    }

    // async handleServerUser(id: string = '', body: any = undefined, { method, error }: HandleServerUserParams) {
    //     try {
    //         const response = await fetch(`/api/user/${id}`, {
    //             method: method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: method === 'GET' ? undefined : JSON.stringify(body),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData?.message || 'Ошибка при запросе данных');
    //         }
    //     } catch (e) {
    //         console.error(error, e);
    //         throw e;
    //     }
    // }

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
                this.fetchUserData(localStorage.getItem('userData1') || '');
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
                this.fetchUserData(localStorage.getItem('userData1') || '');
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
        localStorage.removeItem('userData1');
    }
    async toggleSubscribe(nick_name: string, { subsrcibes, id }: { subsrcibes: string[]; id: string }) {
        const isSubs = subsrcibes.includes(nick_name);
        const updatedSubscriptions = isSubs ? subsrcibes.filter(s => s !== nick_name) : [...(subsrcibes || []), nick_name];
        // this.handleServerUser(id, { subscriptions: updatedSubscriptions }, { method: 'PATCH', error: 'Ошибка при изменении подписки:' });
        try {
            await fetch(`/api/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ subscriptions: updatedSubscriptions }),
            });
        } catch (e) {
            console.error('Ошибка при изменении подписки:', e);
            throw e;
        }
    }
}

export default new User();
