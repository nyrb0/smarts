import Image from 'next/image';
import me from '@/shared/image/me.jpg';
import style from './Channel.module.scss';
import Btn from '@/shared/UI/Button/Button';
import { observable } from 'mobx';

const Channel = observable(() => {
    const data = {
        name: 'Mobile store',
        subscribe: 232,
    };

    return (
        <div className={`${style.channel} dfj  `}>
            <div className={`${style.left} df`}>
                <Image src={me} alt='profile img' />
                <p className={style.name}>{data.name}</p>
                <p className={style.subscribers}>{data.subscribe}тыс</p>
            </div>
            <div className={style.channel}>
                <Btn
                    style={{
                        background: 'transparent',
                        color: 'black',
                        border: 6,
                    }}
                >
                    Подписаться
                </Btn>
            </div>
        </div>
    );
});

export default Channel;
