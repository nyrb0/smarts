import styles from '@/styles/componentsModules/Headers.module.scss';
import PhoneI from '@/icons/phoneI.png';
import Message from '@/icons/messageI.png';
import Image from 'next/image';

import Navigation from '../Navigation/Navigation';

const Headers = () => {
    return (
        <header className={styles.header}>
            <div className={styles.topHeader}>
                <div className={`${styles.topInner} dfca`}>
                    <div className={styles.contact}>
                        <Image width={23} src={PhoneI} alt='Иконка телефон' />
                        +996 700 26 93 01
                    </div>
                    <div className={styles.contact}>
                        <Image
                            width={25}
                            src={Message}
                            alt='Иконка сообщение'
                        />
                        ny1b0@gmail.com
                    </div>
                </div>
            </div>
            <div className={styles.bottomHeader}>
                <div className={styles.navigation}>
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Headers;
