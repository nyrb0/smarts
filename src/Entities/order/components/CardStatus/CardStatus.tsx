import styles from './CardStages.module.scss';
import { ChangeEvent, FC, useEffect, useState } from 'react';

interface CardStatusProps {
    date?: string;
}
const rates = {
    free: {
        id: '4848',
        price: 0,
        desc: 'Обычный тариф',
    },
    fast: {
        id: '4949',
        price: 8.5,
        desc: 'Получить как можно скорее',
    },
    selectDate: {
        id: '4858',
        price: 0,
        desc: 'Указать дату для получение',
    },
};
const CardStatus: FC<CardStatusProps> = ({ date = '1.12.2024' }) => {
    const [selectedRate, setSelectedRate] = useState<string>(rates.free.id);
    const currentDate = new Date();
    const handleChangeRate = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedRate(e.target.value);
    };
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    console.log(formattedDate);

    const opacityLevel = 0.4;

    const { free, selectDate, fast } = rates;

    useEffect(() => {}, []);

    return (
        <div className={`${styles.cards} `}>
            <div className={`${styles.card} `}>
                <div className={`${styles.left}`} style={{ opacity: `${selectedRate === free.id ? 1 : opacityLevel}` }}>
                    <input value={free.id} type='radio' onChange={handleChangeRate} checked={selectedRate === free.id} />
                    <span>{free.price === 0 && 'Бесплатно'}</span>
                    <p>{free.desc}</p>
                </div>
                <div className={styles.right}>{date}</div>
            </div>
            <div className={`${styles.card} `} style={{ opacity: `${selectedRate === fast.id ? 1 : opacityLevel}` }}>
                <div className={`${styles.left}`}>
                    <input value={fast.id} type='radio' onChange={handleChangeRate} checked={selectedRate === fast.id} />
                    <span>{fast.price === 0 ? 'Бесплатно' : `$${fast.price}`}</span>
                    <p>{fast.desc}</p>
                </div>
                <div className={styles.right}>{date}</div>
            </div>
            <div className={`${styles.card} `}>
                <div className={`${styles.left}`} style={{ opacity: `${selectedRate === selectDate.id ? 1 : opacityLevel}` }}>
                    <input type='radio' value={selectDate.id} onChange={handleChangeRate} checked={selectedRate === selectDate.id} />
                    <span>{selectDate.price === 0 ? 'Выберать' : selectDate.price}</span>
                    <p>{selectDate.desc}</p>
                </div>
                <div className={styles.right}>{date}</div>
            </div>
        </div>
    );
};

export default CardStatus;
