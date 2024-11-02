import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

interface CurInterface {
    currency: string;
    handleSaveCurrency: (v: string) => void;
}

export const CurrencyCon = createContext<CurInterface | null>(null);

const CurrencyContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'som');
    const handleSaveCurrency = (v: string) => {
        localStorage.setItem('currency', v);
        setCurrency(v);
    };

    return <CurrencyCon.Provider value={{ currency, handleSaveCurrency }}>{children}</CurrencyCon.Provider>;
};

export default CurrencyContext;
