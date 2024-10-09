'use client';
import stylesOrder from '@/styles/PagesModules/Order.module.scss';
import cartProducts from '../store/cart/cartProducts';
import Cart from '@/widgets/Headers/components/Cart/Cart';
import { observer } from 'mobx-react-lite';
import CurrencyContext from '@/shared/context/currency/CurrencyContext';
import { ChangeEvent, useEffect, useState } from 'react';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import InputOrder from '@/shared/Order/components/Input/InputOrder';
import Button from '@/shared/UI/Button/Button';

const CartProduct = observer(() => {
    const [data, setData] = useState<Phone[]>();

    useEffect(() => {
        const fetching = async () => {
            const res = await fetch('http://localhost:3000/iphone');
            const json = await res.json();
            setData(json);
        };
        fetching();
    }, []);
    return <div className={stylesOrder.carts}>{data && data.slice(0, 8).map(p => <Cart data={p} key={p.id} />)}</div>;
});

const OrderProcess = () => {
    const [promo, setPromo] = useState({ promo: '', bonus: '' });

    return (
        <div className={stylesOrder.process}>
            <div className={stylesOrder.containerOrderCard}>
                <div className={stylesOrder.orderTitle}>Заказ</div>
                <form className={`${stylesOrder.form}`}>
                    <div className={stylesOrder.promo}>
                        <label className={stylesOrder.label}>Промокод</label>
                        <InputOrder
                            isVisibleButton
                            value={promo.promo}
                            onChange={(v: string) => setPromo(prev => ({ ...prev, promo: v }))}
                            placeholder={'Промокод'}
                        />
                    </div>
                    <div className={stylesOrder.promo}>
                        <label className={stylesOrder.label}>Ваша бонусная карта</label>
                        <InputOrder
                            isVisibleButton
                            value={promo.bonus}
                            onChange={(v: string) => setPromo(prev => ({ ...prev, bonus: v }))}
                            placeholder={'Промокод'}
                        />
                    </div>
                    {/* <button>vsvsjn</button> */}
                </form>
                <div className={stylesOrder.resultShop}>
                    <div className={stylesOrder.name}>Итого:</div>
                    <div className={stylesOrder.sum}>1000$</div>
                </div>
                <div className={stylesOrder.resultShop}>
                    <div className={stylesOrder.name}>Скидка:</div>
                    <div className={stylesOrder.sum}>1000$</div>
                </div>
                <div className={stylesOrder.resultShop}>
                    <div className={stylesOrder.name}>Общее:</div>
                    <div className={stylesOrder.sum}>1000$</div>
                </div>
                <div className={stylesOrder.btnOrder}>
                    <Button style={{ background: '#000', color: 'white', border: 6 }}>Проверить</Button>
                </div>
            </div>
        </div>
    );
};

const Order = () => {
    return (
        <div className={`${stylesOrder.order} container`}>
            <div>Процесс покупки</div>
            <div className={`${stylesOrder.buy} dfj`}>
                <CurrencyContext>
                    <CartProduct />
                </CurrencyContext>

                <OrderProcess />
            </div>
        </div>
    );
};

export default Order;
