import { ChannelTypes } from '@/shared/types/User/Channel.types';
import { makeAutoObservable } from 'mobx';

type editSaveProps = Pick<ChannelTypes, 'name' | 'country' | 'desciption' | 'nick_name'>;

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

    async editSave(id: string, body: Partial<editSaveProps>) {
        try {
            await fetch(`/api/channel/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        } catch (e) {
            console.error('Ошибка при изменении канала:', e);
            throw e;
        }
    }
}

export default new ChannelStore();
