'use client';

import styles from '@/styles/componentsModules/Headers.module.scss';
import Image from 'next/image';
import Navigation from '../Navigation/Navigation';
import { FC, useState } from 'react';
import Search from '@/UI/Search/Search';

// State Global
import cartProducts from '@/app/store/cart/cartProducts';
import { observer } from 'mobx-react-lite';
import Cart from '../Cart/Cart';

// Icons imports
import cartIcon from '@/icons/user/cart.png';
import likeIcon from '@/icons/user/like.png';
import userIcon from '@/icons/user/user.png';
import Modal from '@/UI/Modal/Modal';

interface HeaderI {}

const Headers: FC<HeaderI> = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('');

    const changesHandler = (value: string) => {
        setSearchValue(value);
    };
    const [cartModal, setCartModal] = useState(false);
    const closeModalCart = () => {
        setCartModal(false);
    };
    const openModalCart = () => {
        setCartModal(true);
    };

    // const iconsHeaderArray = [cartIcon, likeIcons, useIcon];
    return (
        <header className={`${styles.header}  `}>
            <div className={'container'}>
                <div className={`${styles.inner}  `}>
                    <div className={styles.logoType}>cyber</div>
                    <div className={styles.search}>
                        <Search value={searchValue} onChanges={changesHandler} placeholder={'поиск'} />
                    </div>
                    <div className={styles.bottomHeader}>
                        <div className={styles.navigation}>
                            <Navigation />
                        </div>
                    </div>
                    <div className={`${styles.usersOption} dfba`}>
                        <span>
                            <Image src={cartIcon} alt='cartIcon' onClick={openModalCart} />
                            <span className={`${styles.cartCount} dfca`}>
                                {cartProducts.productStorage.length}
                            </span>
                        </span>
                        <span>
                            <Image src={likeIcon} alt='cartIcon' />
                        </span>
                        <span>
                            <Image src={userIcon} alt='cartIcon' />
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <Modal isOpen={cartModal} close={closeModalCart}>
                {cartProducts.productStorage.length ? (
                    cartProducts.productStorage.map(p => <Cart data={p} key={p.id} />)
                ) : (
                    <div className={styles.notLength}>Вы еще не выбрали</div>
                )}
            </Modal>
        </header>
    );
});

export default Headers;
