'use client';
// styles
import styles from '@/styles/componentsModules/header/Headers.module.scss';

// modules
import Image from 'next/image';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import Modal from '@/shared/UI/Modal/Modal';
import Navigation from './components/Navigation/Navigation';
import Search from '@/shared/UI/Search/Search';

// State Global
import cartProducts from '@/app/store/cart/cartProducts';
import { observer } from 'mobx-react-lite';
import Cart from './components/Cart/Cart';

// Icons imports
import cartIcon from '@/shared/icons/user/cart.png';
import likeIcon from '@/shared/icons/user/like.png';
import userIcon from '@/shared/icons/user/user.png';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import CurrencyContext, { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import Button from '@/shared/UI/Button/Button';
import Radio from '@/shared/UI/CustomRadio/Radio';
import searchStore from '@/app/store/searchStore/searchStore';
import Result from './components/ResultSearch/Result';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import Link from 'next/link';
import user from '@/app/store/user/user';
import MyChannel from '@/shared/components/MyChannel';

interface HeaderI {}

interface CartI {
    closeModalCart: () => void;
    value: boolean;
}

const CartComponent: FC<CartI> = ({ closeModalCart, value }) => {
    const route = useRouter();
    return (
        <CurrencyContext>
            <Modal isOpen={value} close={closeModalCart}>
                {cartProducts.productStorage.length ? (
                    <>
                        {cartProducts.productStorage.map(p => (
                            <Cart data={p} key={p.id} />
                        ))}
                        <div className='dfc' style={{ marginTop: 10 }}>
                            <span style={{ width: '150px' }}>
                                <Button
                                    style={{
                                        background: '#000',
                                        color: '#fff',
                                        border: 6,
                                    }}
                                    onClick={() => {
                                        route.push('/order');
                                        closeModalCart();
                                    }}
                                >
                                    {cartProducts.productStorage.length === 1 ? 'Заказать товар' : 'Заказать товары'}
                                </Button>
                            </span>
                        </div>
                    </>
                ) : (
                    <div className={styles.notLength}>Вы еще не выбрали</div>
                )}
            </Modal>
        </CurrencyContext>
    );
};
const ListCurrency = observer(() => {
    const context = useContext(CurrencyCon);
    if (!context) throw new Error('Error context in carrency');
    const { userFullData } = user;

    const valuesCurrency = [
        { value: 'som', label: 'KGS', money: userFullData?.have_money.som || 0 },
        { value: 'rub', label: '₽', money: userFullData?.have_money.rub || 0 },
        { value: 'usd', label: '$', money: userFullData?.have_money.usd || 0 },
    ];

    const { currency, handleSaveCurrency } = context;

    const selectedOptionCurrency = (v: string) => {
        handleSaveCurrency(v);
    };
    return <Radio options={valuesCurrency} selected={currency} onChange={selectedOptionCurrency} />;
});
const Headers: FC<HeaderI> = observer(() => {
    const [data, setData] = useState<Phone[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [cartModal, setCartModal] = useState(false);
    const [include, setInclude] = useState<Phone[]>([]);
    const router = useRouter();
    const { toSaveStore } = searchStore;

    const changesHandler = async (value: string) => {
        await setInclude(data.filter(s => s.name && s.name.toLowerCase().includes(searchValue.toLowerCase())));
        setSearchValue(value);
    };
    console.log(include, 'include');

    const closeModalCart = () => {
        setCartModal(false);
    };
    const openModalCart = () => {
        setCartModal(true);
    };
    const openMenu = () => {
        setOpenProfileMenu(prev => !prev);
    };

    const closeVisibleSearch = (isClose: boolean) => {
        isClose ? setSearchValue('') : null;
    };
    const setValueFromSearch = (value: string) => {
        setSearchValue(value);
    };

    const toSearch = useCallback(
        (e: string) => {
            if (e === 'Enter') {
                setInclude(data.filter(s => s.name && s.name.toLowerCase().includes(searchValue.toLowerCase())));
                toSaveStore(searchValue);
            }
        },
        [data, searchValue]
    );

    useEffect(() => {
        fetch('/api/iphone')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(e => {
                throw new Error('Error getting search data Phone');
            });
    }, []);

    // const iconsHeaderArray = [cartIcon, likeIcons, useIcon];

    return (
        <header className={`${styles.header}`}>
            <CartComponent value={cartModal} closeModalCart={closeModalCart} />
            <div className={'container'}>
                <div className={`${styles.inner}`}>
                    <Link href={'/home'} className={styles.logoType} style={{ cursor: 'pointer' }}>
                        cyber
                    </Link>
                    <div className={styles.search}>
                        <Search value={searchValue} onChanges={changesHandler} placeholder={'поиск'} onKeyDown={toSearch} />
                        {searchValue.length > 0 && (
                            <div className={styles.searchResult}>
                                <Result setValue={setValueFromSearch} close={closeVisibleSearch} result={include} story={searchStore.stories} />
                            </div>
                        )}
                    </div>
                    <div className={styles.bottomHeader}>
                        <div className={styles.navigation}>
                            <Navigation />
                        </div>
                    </div>
                    <div className={`${styles.usersOption} dfba`}>
                        <span>
                            <Image src={cartIcon} alt='cartIcon' onClick={openModalCart} />
                            <span className={`${styles.cartCount} dfca`}>{cartProducts.productStorage.length}</span>
                        </span>
                        <span>
                            <Image src={likeIcon} alt='like icon' onClick={() => router.push('/profile/saved')} />
                        </span>
                        <span className={`${styles.menuProfile} dfa`}>
                            <Image src={userIcon} alt='profile' onClick={() => router.push('/profile')} />
                            <div className={styles.arrow} onClick={openMenu}>
                                {openProfileMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                            {openProfileMenu && (
                                <div className={styles.menuProfileBottom}>
                                    <div className={styles.wrapper}>
                                        <CurrencyContext>
                                            <ListCurrency />
                                        </CurrencyContext>
                                        <div className={styles.channel}>
                                            <p className={styles.my}>Мои каналы:</p>
                                            {user.userFullData?.my_channels ? (
                                                user.userFullData?.my_channels.map(user => <MyChannel channel={user} key={''} />)
                                            ) : (
                                                <p className={styles.my}>-Пусто</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <hr />
        </header>
    );
});

export default Headers;
