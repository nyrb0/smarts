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
import user from '../store/user/user';

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
    return <div className={stylesOrder.carts}>{data && data.slice(0, 4).map(p => <Cart data={p} key={p.id} />)}</div>;
});

const OrderProcess = () => {
    const bonusCode = ['@34322#*', '4bqq32j', 'nuaf111'];
    const promoCode = ['salam23', 'nur89', 'doni433', 'samu1ai'];
    const [promo, setPromo] = useState({ promo: '', bonus: '' });
    let allSum = cartProducts.productStorage?.reduce((sum, el) => el.price.som + sum, 0);

    const promoCodeHandler = (procent: number) => {
        if (!promo.bonus) return;
        const isPromo = bonusCode.find(p => p === promo.bonus);
        if (isPromo) {
            allSum = (allSum / procent) * 1000;
        }
    };

    const toSendOrder = () => {
        if (user.userFullData?.have_money) {
            const enoughtMoney = allSum - user.userFullData?.have_money.som;
        }
    };
    return (
        <div className={stylesOrder.process}>
            <div className={stylesOrder.containerOrderCard}>
                <div className={stylesOrder.orderTitle}>Заказ</div>
                <form className={`${stylesOrder.form}`}>
                    <div className={stylesOrder.promo}>
                        <label className={stylesOrder.label}>Промокод</label>
                        <InputOrder
                            isVisibleButton={false}
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
                            onClick={() => promoCodeHandler(10)}
                        />
                    </div>
                    {/* <button>vsvsjn</button> */}
                </form>
                <div className={`${stylesOrder.resultShop}`} style={{ fontWeight: 700, color: '#000' }}>
                    <div className={stylesOrder.name}>Итого:</div>
                    <div className={stylesOrder.sum}>{allSum}$</div>
                </div>
                <div className={stylesOrder.resultShop}>
                    <div className={stylesOrder.name}>Скидка:</div>
                    <div className={stylesOrder.sum}>1000$</div>
                </div>
                <div className={stylesOrder.resultShop} style={{ fontWeight: 700, color: '#000' }}>
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
            <div className={`${stylesOrder.buy} dfj`}>
                <CurrencyContext>
                    <div>
                        <h2>Процесс покупки</h2>
                        {cartProducts.productStorage.length > 0 ? (
                            cartProducts.productStorage.map(p => <Cart data={p} key={p.id} />)
                        ) : (
                            <div>В корзине ничего нету :(</div>
                        )}
                    </div>
                </CurrencyContext>
                <OrderProcess />
            </div>
        </div>
    );
};

export default Order;
