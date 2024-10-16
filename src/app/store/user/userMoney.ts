import { makeAutoObservable } from 'mobx';

class UserMoney {
    constructor() {
        makeAutoObservable(this);
    }

    async takeMoney(userId: string, data: any) {
        try {
            fetch(`/api/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (err) {
            throw new Error('Error in store TakeMoney Method');
        }
    }
}

export default new UserMoney();
