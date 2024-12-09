import { makeAutoObservable } from 'mobx';

type notificatioonProps = {
    id: string;
    title: string;
    desc: string;
    status: 'error' | 'right';
};

class NotificationStore {
    notification: notificatioonProps[] = [
        // {
        //     id: '1',
        //     title: 'Адресс',
        //     desc: 'Выберите Адресс дляhvb hhrbv tg trgreg trgtr gtrgrt grtgtrg fhvbdfhvbjfgvbhbvhifgbhv b следущего этапа',
        //     status: 'error',
        // },
        // { id: '2', title: 'Адресс', desc: 'Выберите Адресс для следущего этапа', status: 'right' },
        // { id: '3', title: 'Адресс', desc: 'Выберите Адресс для следущего этапа', status: 'error' },
        // { id: '4', title: 'Адресс', desc: 'Выберите Адресс для следущего этапа', status: 'right' },
    ];
    constructor() {
        makeAutoObservable(this);
    }

    AddToNotification(n: notificatioonProps) {
        this.notification.push(n);
        setTimeout(() => {
            this.notification.shift();
        }, 3000);
    }
    deleteNotification(id: string) {
        this.notification = this.notification.filter(f => f.id !== id);
    }

    GetNotification() {
        return this.notification;
    }
}

export default new NotificationStore();
