import { ChannelTypes } from '@/shared/types/User/Channel.types';
import { makeAutoObservable } from 'mobx';

class ChannelStore {
    channelData: ChannelTypes[] = [];
    constructor() {
        makeAutoObservable(this);
    }
}

export default new ChannelStore();
