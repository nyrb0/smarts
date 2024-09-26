'use client';

import styles from '@/styles/componentsModules/Block.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import Btn from '@/UI/Button/Button';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// icons
import likeProducts from '@/icons/likeProducts.png';
import { usersType } from '@/types/User/User.types';
import { observer } from 'mobx-react-lite';
import user from '@/app/store/user/user';

interface BlockI {
    data: Phone | null;
}

const Block: FC<BlockI> = ({ data: teh }) => {
    const [data, setData] = useState<usersType[]>();

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

    const setServerUser = async (theData: Phone) => {
        await user.search(theData);
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
                            <Image src={likeProducts} alt='like procducts' onClick={() => setServerUser(teh)} />
                        </div>
                        <div className={`${styles.thePhone} dfc`}>
                            {teh.image?.url ? (
                                <Image src={teh.image.url} alt='like procducts' width={150} height={260} />
                            ) : null}
                        </div>
                        <div className={styles.name}>{teh.name}</div>
                        <div className={styles.price}>{teh?.price?.rub}P</div>
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
