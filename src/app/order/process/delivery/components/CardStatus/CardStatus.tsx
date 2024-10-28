import styles from './CardStages.module.scss';
const CardStatus = () => {
    return (
        <div className={`${styles.card} dfj`}>
            <div className={`${styles.left} df`}>
                <input type='radio' />
                <p>Бесплатно</p>
                <p>Regulary shipment</p>
            </div>
        </div>
    );
};

export default CardStatus;
