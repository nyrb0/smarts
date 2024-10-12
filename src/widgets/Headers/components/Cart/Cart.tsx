'use client';
import cartProducts from '@/app/store/cart/cartProducts';
import stylesCart from '@/styles/componentsModules/Cart.module.scss';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import { div } from 'framer-motion/client';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import { currencyChoose } from '@/Features/CurrencyChoose';

interface CartI {
    data: Phone;
}

const Cart: FC<CartI> = observer(({ data }) => {
    const [count, setCount] = useState<number>(0);
    const context = useContext(CurrencyCon);

    if (!context) throw new Error('Error in currency error');

    const { currency, setCurrency } = context;

    const inc = () => {
        setCount(prev => prev + 1);
    };
    const dec = () => {
        if (count <= 0) return;
        setCount(prev => prev - 1);
    };

    return (
        <div className={`${stylesCart.cart} dfa`}>
            <div className={stylesCart.img}>
                <Image src={data?.image?.url} alt={data.name} width={50} height={85} />
            </div>
            <div className={stylesCart.name}>{data.name}</div>
            <div className={`${stylesCart.count} dfa`}>
                <div>
                    <button onClick={dec}>-</button>
                    <span>{count}</span>
                    <button onClick={inc}>+</button>
                </div>
            </div>
            <div className={stylesCart.price}>
                {currency === 'rub' ? data?.price?.rub : currency === 'som' ? data?.price?.som : data?.price?.usd}
                {currencyChoose(currency)}
            </div>
            <div className={stylesCart.x} onClick={() => cartProducts.deleteProduct(data)}>
                X
            </div>
        </div>
    );
});

export default Cart;
