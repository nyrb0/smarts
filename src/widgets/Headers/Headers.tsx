'use client';
// styles
import styles from '@/styles/componentsModules/Headers.module.scss';

// modules
import Image from 'next/image';
import { FC, useState } from 'react';
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

interface HeaderI {}

const Headers: FC<HeaderI> = observer(() => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    const router = useRouter();

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

    const openMenu = () => {
        setOpenProfileMenu(prev => !prev);
    };

    // const iconsHeaderArray = [cartIcon, likeIcons, useIcon];
    return (
        <header className={`${styles.header}`}>
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
                            <span className={`${styles.cartCount} dfca`}>{cartProducts.productStorage.length}</span>
                        </span>
                        <span>
                            <Image src={likeIcon} alt='like icon' />
                        </span>
                        <span className='dfa'>
                            <Image src={userIcon} alt='profile' onClick={() => router.push('/profile')} />
                            <div className={styles.arrow} onClick={openMenu}>
                                {openProfileMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
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
