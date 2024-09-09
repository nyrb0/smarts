'use client';
import styles from '@/styles/PagesModules/Home.module.scss';
import Image from 'next/image';
import phone from '@/icons/bigPhone.png';
import CusSelect from '@/UI/Select/CusSelect';
import Button from '@/UI/Button/Button';
import { Iphone, IphoneArr } from '@/types/Phones/TypePhone';
import Block from '@/components/Block/Block';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [data, setData] = useState<null | IphoneArr>(null);
    const brand = ['Iphone', 'Huawei', 'Samsung', 'Redmi', 'Pixel'];
    const [selected, setSelected] = useState<string>('');

    async function getData() {
        const res = await axios('http://localhost:3000/phones');
        const data = await res.data;
        setData(data);
    }
    console.log(data);
    useEffect(() => {
        getData();
    }, []);
    // console.log(data?.iphones);
    return (
        <main className={styles.home}>
            <div className='container'>
                <div className={`${styles.globalNews} df`}>
                    <h1 className={styles.text}>
                        Your Destination for Cutting-Edge Mobile Devices
                    </h1>
                    <Image className={styles.img} src={phone} alt='iphone' />
                </div>
            </div>
            <div className={`${styles.lineSort} dfca`}>
                <div className={`${styles.selectsSorts} container `}>
                    <CusSelect values={brand} text={'Brand'} />
                    <CusSelect values={brand} text={'Brand'} />
                    <CusSelect values={brand} text={'Brand'} />
                    <div className={styles.btn}>
                        <Button style={{ background: '#219EBC', border: 12 }}>
                            Search
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.smarts}>
                {data && <Block data={data?.iphones} />}
            </div>
        </main>
    );
}
