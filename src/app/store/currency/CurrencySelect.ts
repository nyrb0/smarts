import { makeAutoObservable } from 'mobx';

type currencyTypes = 'rub' | 'som' | 'usd';

class CurrencySelect {
    selectCurrency: currencyTypes = 'som';
    constructor() {
        makeAutoObservable(this);
    }
}

export default new CurrencySelect();
