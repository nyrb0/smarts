import { currencyChoose } from '@/Features/CurrencyChoose';
import CurrencyContext, { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import { Price } from '@/shared/types/Phones/TypePhone.types';
import React, { FC, useContext } from 'react';

interface CurrencyComponentsProps {
    money: Price;
}

const CurrencyComponent: FC<CurrencyComponentsProps> = ({ money }) => {
    const context = useContext(CurrencyCon);
    if (!context) throw new Error('Error in context currency');
    const { currency } = context;
    return (
        <>
            {currency === 'rub' ? money.rub : currency === 'som' ? money.som : money.usd}
            {currencyChoose(currency)}
        </>
    );
};

const Currency: FC<CurrencyComponentsProps> = ({ money }) => {
    return (
        <CurrencyContext>
            <CurrencyComponent money={money} />
        </CurrencyContext>
    );
};

export default Currency;
