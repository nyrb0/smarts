'use client';
import stylesCart from '@/styles/componentsModules/Cart.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import Image from 'next/image';
import { FC, useState } from 'react';

interface CartI {
    data: Phone;
}

const Cart: FC<CartI> = ({ data }) => {
    const [count, setCount] = useState<number>(0);

    const inc = () => {
        setCount(prev => prev--);
    };
    const dec = () => {
        if (count <= 0) return;
        setCount(prev => prev++);
    };
    return (
        <div className={`${stylesCart.cart} dfa`}>
            <div className={stylesCart.name}>
                <Image src={data.image.url} alt={data.name} width={50} height={69} />
            </div>
            <div className={stylesCart.name}>{data.name}</div>
            <div className={stylesCart.count}>
                <button onClick={inc}>+</button>
                {count}
                <button onClick={dec}>-</button>
            </div>
        </div>
    );
};

export default Cart;
