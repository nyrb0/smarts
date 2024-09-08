import styles from '@/styles/PagesModules/Home.module.scss';
import Image from 'next/image';
import phone from '@/icons/bigPhone.png';

export default function Home() {
    return (
        <main className={styles.home}>
            <div className={`${styles.globalNews} df  `}>
                <h1 className={styles.text}>
                    Your Destination for Cutting-Edge Mobile Devices
                </h1>
                <Image className={styles.img} src={phone} alt='iphone' />
            </div>
        </main>
    );
}
