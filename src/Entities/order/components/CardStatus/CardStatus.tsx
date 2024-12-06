import { useTime } from '@/Features/hooks/time/useTime';
import styles from './CardStages.module.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react';

interface CardStatusProps {
    date?: string;
}
const rates = {
    free: {
        id: '4848',
        price: 0,
        time: 1555200000,
        desc: 'Обычный тариф',
    },
    fast: {
        id: '4949',
        price: 8.5,
        time: 604800000,
        desc: 'Получить как можно скорее',
    },
    selectDate: {
        id: '4858',
        price: 0,
        desc: 'Указать дату для получение',
    },
};
const CardStatus: FC<CardStatusProps> = ({ date = '1.12.2024' }) => {
    const isSelectedRate = localStorage.getItem('isRate') || rates.free.id;
    const [selectedRate, setSelectedRate] = useState<string>(isSelectedRate);

    const handleChangeRate = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        localStorage.setItem('isRate', id);
        setSelectedRate(e.target.value);
    };

    const { currentTimeStamp, setCurrentDate, getFullDate } = useTime();

    //// отвачает за прозрачность тарифов
    const opacityLevel = 0.4;

    const { free, selectDate, fast } = rates;
    const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);
    };

    useEffect(() => {}, []);

    return (
        <div className={`${styles.cards} `}>
            <div className={`${styles.card} `}>
                <div className={`${styles.left}`} style={{ opacity: `${selectedRate === free.id ? 1 : opacityLevel}` }}>
                    <input value={free.id} type='radio' onChange={e => handleChangeRate(e, free.id)} checked={selectedRate === free.id} />
                    <span>{free.price === 0 && 'Бесплатно'}</span>
                    <p>{free.desc}</p>
                </div>
                <div className={styles.right}>{setCurrentDate(Date.now() + free.time)}</div>
            </div>
            <div className={`${styles.card}`} style={{ opacity: `${selectedRate === fast.id ? 1 : opacityLevel}` }}>
                <div className={`${styles.left}`}>
                    <input value={fast.id} type='radio' onChange={e => handleChangeRate(e, fast.id)} checked={selectedRate === fast.id} />
                    <span>{fast.price === 0 ? 'Бесплатно' : `$${fast.price}`}</span>
                    <p>{fast.desc}</p>
                </div>
                <div className={styles.right}>{setCurrentDate(Date.now() + fast.time)}</div>
            </div>
            <div className={`${styles.card} `}>
                <div className={`${styles.left}`} style={{ opacity: `${selectedRate === selectDate.id ? 1 : opacityLevel}` }}>
                    <input
                        type='radio'
                        value={selectDate.id}
                        onChange={e => handleChangeRate(e, selectDate.id)}
                        checked={selectedRate === selectDate.id}
                    />
                    <span>{selectDate.price === 0 ? 'Выберать' : selectDate.price}</span>
                    <p>{selectDate.desc}</p>
                </div>
                <div className={styles.right}>
                    <input type='date' onChange={handleDate} />
                </div>
            </div>
        </div>
    );
};

export default CardStatus;
