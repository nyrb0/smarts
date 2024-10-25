'use client';

// components
import Btn from '@/shared/UI/Button/Button';

// types
import { usersType } from '@/shared/types/User/User.types';

// icons
import likeProducts from '@/shared//icons/likeProducts.png';

// other
import { observer } from 'mobx-react-lite';
import user from '@/app/store/user/user';
import styles from '@/styles/componentsModules/Block.module.scss';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import Image from 'next/image';
import { FC, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { currencyChoose } from '@/Features/CurrencyChoose';
import { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import Currency from '../Currencies/Currency';
interface BlockI {
    data: Phone | null;
}

const Block: FC<BlockI> = ({ data: teh }) => {
    const [data, setData] = useState<usersType[]>();

    const context = useContext(CurrencyCon);
    if (!context) throw new Error('Error in context currency');
    const { currency } = context;

    // const savedResursUser = async () => {
    //     try {
    //         await fetch('http://localhost:3000/user', {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify([user.userAllFullData]),
    //         });
    //     } catch (err) {
    //         throw console.log(err);
    //     }
    // };

    const setServerUser = (theData: Phone) => {
        const isLiked = user.userFullData?.saved.some(s => s.id === theData.id);
        if (isLiked) {
            user.unLike(theData);
            return;
        }
        user.like(theData);
        // await savedResursUser();
    };

    const savedGet = async () => {
        const res = await fetch('/api/user');
        const d = await res.json();
        setData(d);
    };

    useEffect(() => {
        savedGet();
    }, []);

    return (
        <div className={styles.blocks}>
            {teh && (
                <div key={teh.id} className={styles.block}>
                    <div className={styles.inner}>
                        <div className={`${styles.like} df`}>
                            <Image src={likeProducts} alt='like procducts' style={{ fill: 'red' }} onClick={() => setServerUser(teh)} />
                        </div>
                        <div className={`${styles.thePhone} dfc`}>
                            {teh.image?.url ? (
                                <Link href={`/home/${teh.id}`}>
                                    <Image src={teh.image.url} alt='like procducts' width={150} height={260} />
                                </Link>
                            ) : null}
                        </div>
                        <div className={styles.name}>{teh.name}</div>
                        <div className={styles.price}>
                            <Currency money={teh.price} />
                        </div>
                        <div className={`${styles.btn} dfc`}>
                            <span>
                                <Btn
                                    style={{
                                        background: 'black',
                                        border: 6,
                                    }}
                                >
                                    Buy now
                                </Btn>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(Block);
