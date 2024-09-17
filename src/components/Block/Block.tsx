import styles from '@/styles/componentsModules/Block.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import Button from '@/UI/Button/Button';
import Image from 'next/image';
import { FC } from 'react';
import call from '@/icons/call.png';
import Link from 'next/link';
import styled from 'styled-components';

interface BlockI {
    data: Phone | null;
}

const Block: FC<BlockI> = ({ data: teh }) => {
    // console.log(data);

    return (
        <Link href={`/page/${teh?.id}`} className={styles.blocks}>
            {teh && (
                <div key={teh.id} className={styles.block}>
                    <div className={`${styles.image} dfc`}>
                        <Image
                            className={styles.img}
                            width={170}
                            height={328}
                            src={teh.image.url}
                            alt='iphons'
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.model}>{teh.name}</div>
                        <div className={styles.price}>
                            цена: {teh.price.som}сом
                        </div>
                        <ul>
                            <li>Разрешение: {teh.screen}</li>
                            <li>Версия IOS: {teh.ios}</li>
                        </ul>
                    </div>
                    <div className={`${styles.buy} df`}>
                        <div className={styles.buyBtn}>
                            <Button
                                style={{
                                    background: '#219ebc',
                                    border: 72,
                                }}
                            >
                                Buy now
                            </Button>
                        </div>
                        <Image src={call} alt='telephone' />
                    </div>
                </div>
            )}
        </Link>
    );
};

export default Block;
