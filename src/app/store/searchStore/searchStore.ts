import { SearchStoreType } from '@/shared/types/User/SearchStore.types';
import { makeAutoObservable, runInAction } from 'mobx';

class SearchStore {
    stories: SearchStoreType[] = [];
    constructor() {
        makeAutoObservable(this);
        this.getStore();
    }

    async toSaveStore(title: string) {
        try {
            fetch('/api/search-store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            }).then(res => {
                if (!res) {
                    throw new Error('Failed to save the store');
                }
            });

            // Optional: You can reload the stories or add the new story directly
            this.getStore();
        } catch (err) {
            throw err;
        }
    }
    async getStore(title?: string) {
        try {
            const res = await fetch('/api/search-store');
            const data = await res.json();
            runInAction(() => {
                this.stories = data;
            });
        } catch (err) {
            throw err;
        }
    }
}
export default new SearchStore();
