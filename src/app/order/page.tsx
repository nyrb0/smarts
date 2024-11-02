'use client';
import stylesOrder from '@/styles/PagesModules/Order.module.scss';
import cartProducts from '../store/cart/cartProducts';
import Cart from '@/widgets/Headers/components/Cart/Cart';
import { observer } from 'mobx-react-lite';
import CurrencyContext, { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import InputOrder from '@/shared/components/Order/components/Input/InputOrder';
import Button from '@/shared/UI/Button/Button';
import user from '../store/user/user';
import { bonusCode, promoCode } from '@/Features/promoCodes';
import { currencyChoose } from '@/Features/CurrencyChoose';
import { useRouter } from 'next/navigation';
import userMoney from '../store/user/userMoney';

const CartProduct = observer(() => {
    const [data, setData] = useState<Phone[]>();

    // useEffect(() => {
    //     const fetching = async () => {
    //         const res = await fetch('http://localhost:3000/iphone');
    //         const json = await res.json();
    //         setData(json);
    //     };
    //     fetching();
    // }, []);

    return <div className={stylesOrder.carts}>{data && data.slice(0, 4).map(p => <Cart data={p} key={p.id} />)}</div>;
});

type CurrencyTypes = 'rub' | 'usd' | 'som';
const OrderProcess = observer(() => {
    const theCurrency = localStorage.getItem('currency') as CurrencyTypes;
    const [promo, setPromo] = useState({ promo: '', bonus: '' });
    const [promoNotificate, setPromoNotificate] = useState({ promo: '', bonus: '' });
    const [next, setNext] = useState(false);
    const [war, setWar] = useState('');
    const [discount, setDiscount] = useState(0);
    let allSum = cartProducts.productStorage?.reduce((sum, el) => el.price[theCurrency] + sum, 0);
    const [allSumWithDiscount, setAllSumWithDiscount] = useState(allSum);
    const calculateDiscount = (sum: number, percent: number) => {
        if (sum < 0 || percent < 0) {
            throw new Error('Сумма и процент должны быть неотрицательными');
        }
        return (sum * percent) / 100;
    };

    const router = useRouter();
    useEffect(() => {
        setAllSumWithDiscount(allSum - discount);
    }, [allSum, discount]);

    const isCurrectPromos = (n: string[], theN: string) => {
        return n.some(n => n === theN);
    };
    const isBonus = isCurrectPromos(bonusCode, promo.bonus);
    const promoCodeHandler = (procent: number) => {
        if (!promo.bonus) return;
        if (isBonus) {
            setDiscount(calculateDiscount(allSum, procent));
            setPromoNotificate(prev => ({ ...prev, bonus: 'Поздравляю вы получили скидку' }));
            console.log(allSumWithDiscount);
        }
    };

    const context = useContext(CurrencyCon);
    if (!context) throw new Error('Error in currency error');
    const { currency } = context;

    const validateOrderConditions = () => {
        if (next) return false;
        if (allSum <= 0) {
            setWar('Сумма заказа должна быть больше 0');
            return false;
        }
        if (!user.userFullData?.have_money?.[theCurrency]) {
            setWar('Данные о деньгах пользователя недоступны');
            return false;
        }
        return true;
    };

    const toSendOrder = () => {
        if (!validateOrderConditions()) {
            router.push('/order/process');
            return;
        }
        if (user.userFullData?.have_money?.[theCurrency]) {
            const money = user.userFullData.have_money;
            const enoughtMoney = money?.[theCurrency] - allSumWithDiscount;

            if (enoughtMoney < 0) {
                setWar('У вас не хватает баланс');
                return false;
            }
            // userMoney.takeMoney(user.userFullData.id, { have_money: { ...money, usd: 0 } });
        }
        setNext(true);
        const isPromo = isCurrectPromos(promoCode, promo.promo);
        if (isPromo) {
            // добавление логики
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
                    <div className={stylesOrder.sum}>
                        {allSum}
                        {currencyChoose(currency)}
                    </div>
                </div>
                <div className={stylesOrder.resultShop}>
                    <div className={stylesOrder.name}>Скидка:</div>
                    <div className={stylesOrder.sum}>{discount} </div>
                </div>
                <div className={stylesOrder.resultShop} style={{ fontWeight: 700, color: '#000' }}>
                    <div className={stylesOrder.name}>Общее:</div>
                    <div className={stylesOrder.sum}>
                        {allSumWithDiscount}
                        {currencyChoose(currency)}
                    </div>
                </div>
                <div className={stylesOrder.warning}>
                    <div className={stylesOrder.error}>{war}</div>
                    <div className={stylesOrder.bonus}>{promoNotificate.bonus}</div>
                    <div className={stylesOrder.promo}>{promoNotificate.promo}</div>
                </div>
                <div className={stylesOrder.btnOrder}>
                    <Button style={{ background: '#000', color: 'white', border: 6 }} onClick={toSendOrder}>
                        {!next ? 'Проверить' : 'Дальше'}
                    </Button>
                </div>
            </div>
        </div>
    );
});

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
                            <div>Нету ничего :(</div>
                        )}
                    </div>
                    <OrderProcess />
                </CurrencyContext>
            </div>
        </div>
    );
};

export default Order;
