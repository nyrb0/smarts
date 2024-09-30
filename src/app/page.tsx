import style from '@/styles/PagesModules/Main.module.scss';
import bigPhone from '@/shared/icons/bigPhone.png';
import Image from 'next/image';
import Btn from '@/shared/UI/Button/Button';
import Link from 'next/link';

export default function Home() {
    return (
        <main className={style.main}>
            <div className={`${style.topPhones} dfa`}>
                <div className={`${style.text} `}>
                    <div className={style.name}>
                        IPhone 16 <span>Pro</span>
                        <div className={style.quote}>Created to change everything for the better. For everyone</div>
                    </div>
                    <div className={style.btn}>
                        <Btn
                            style={{
                                background: 'transparent',
                                color: '#fff',
                                border: 6,
                                line: '1px solid #fff',
                            }}
                        >
                            <Link href={'/home'}>Show now</Link>
                        </Btn>
                    </div>
                </div>
                <div>
                    <Image src={bigPhone} alt='big phone' />
                </div>
            </div>
        </main>
    );
}
