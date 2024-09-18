'use client';
import cartProducts from '@/app/store/cart/cartProducts';
import stylesCart from '@/styles/componentsModules/Cart.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import { div } from 'framer-motion/client';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { FC, useState } from 'react';

interface CartI {
    data: Phone;
}

const Cart: FC<CartI> = observer(({ data }) => {
    const [count, setCount] = useState<number>(0);

    const inc = () => {
        setCount(prev => prev + 1);
    };
    const dec = () => {
        if (count <= 0) return;
        setCount(prev => prev - 1);
    };
    return (
        <div className={`${stylesCart.cart} dfa`}>
            <div className={stylesCart.name}>
                <Image src={data.image.url} alt={data.name} width={50} height={69} />
            </div>
            <div className={stylesCart.name}>{data.name}</div>
            <div className={`${stylesCart.count} dfa`}>
                <div>
                    <button onClick={dec}>-</button>
                    {count}
                    <button onClick={inc}>+</button>
                </div>
            </div>
            <div className={stylesCart.price}>{data.price.rub}rub</div>
            <div className={stylesCart.x} onClick={() => cartProducts.deleteProduct(data)}>
                X
            </div>
        </div>
    );
});

export default Cart;
