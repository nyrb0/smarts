import { ChannelTypes } from '@/shared/types/User/Channel.types';
import { makeAutoObservable } from 'mobx';

class ChannelStore {
    channelData: ChannelTypes[] = [];
    constructor() {
        makeAutoObservable(this);
    }

    async viewUp(id: string, view: number) {
        try {
            await fetch(`/api/channel/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ view: view + 1 }),
            });
        } catch (e) {
            console.error('Ошибка при изменении подписки:', e);
            throw e;
        }
    }
}

export default new ChannelStore();
