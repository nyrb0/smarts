import styles from '@/styles/componentsModules/Block.module.scss';
import { Iphone, IphoneArr } from '@/types/Phones/TypePhone';
import { FC } from 'react';

interface BlockI {
    data: Iphone[] | null;
}

const Block: FC<BlockI> = ({ data }) => {
    console.log(data);
    return (
        <div>
            {data &&
                data.map(item => (
                    <div key={item.id} className={styles.block}></div>
                ))}
        </div>
    );
};

export default Block;
