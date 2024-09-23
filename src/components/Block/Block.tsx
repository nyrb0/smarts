import styles from '@/styles/componentsModules/Block.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import Btn from '@/UI/Button/Button';
import Image from 'next/image';
import { FC } from 'react';
import call from '@/icons/call.png';
import Link from 'next/link';

// icons
import likeProducts from '@/icons/likeProducts.png';

interface BlockI {
    data: Phone | null;
}

const Block: FC<BlockI> = ({ data: teh }) => {
    // console.log(data);

    return (
        <Link href={`/home/${teh?.id}`} className={styles.blocks}>
            {teh && (
                <div key={teh.id} className={styles.block}>
                    <div className={styles.inner}>
                        <div className={`${styles.like} df`}>
                            <Image src={likeProducts} alt='like procducts' />
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
        </Link>
    );
};

export default Block;
