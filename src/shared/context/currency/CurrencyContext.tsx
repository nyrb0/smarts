import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

interface CurInterface {
    currency: string;
    setCurrency: Dispatch<SetStateAction<string>>;
}

export const CurrencyCon = createContext<CurInterface | null>(null);

const CurrencyContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || '');

    return <CurrencyCon.Provider value={{ currency, setCurrency }}>{children}</CurrencyCon.Provider>;
};

export default CurrencyContext;
