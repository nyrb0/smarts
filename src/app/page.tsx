'use client';
import styles from '@/styles/PagesModules/Home.module.scss';
import Image from 'next/image';
import phone from '@/icons/bigPhone.png';
import CusSelect from '@/UI/Select/CusSelect';
import Button from '@/UI/Button/Button';
import { IphoneArr } from '@/types/Phones/TypePhone';
import Block from '@/components/Block/Block';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '@/components/Filters/Filter';

export default function Home() {
    const [data, setData] = useState<null | IphoneArr>(null);
    const [selectModelPhone, setSelectModelPhone] = useState();

    const brand1 = ['Iphone', 'Huawei', 'Samsung', 'Redmi', 'Pixel'];
    const brand = {
        iphone: 'Iphone',
        huawei: 'Huawei',
        samsung: 'Samsung',
        redmi: 'Redmi',
        pixel: 'Pixel',
    };

    const brands = Object.keys(brand);

    const [selected, setSelected] = useState<string>('iphone');

    async function getData() {
        const res = await axios(`http://localhost:3000/${selected}`);
        const data = await res.data;
        setData(data);
    }
    useEffect(() => {
        getData();
    }, [selected]);

    const changeSel = (s: string) => {
        setSelected(s);
    };
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
                    <CusSelect
                        sel={selected}
                        values={brands}
                        changes={changeSel}
                        text={'Brand'}
                    />
                    <div className={styles.btn}>
                        <Button style={{ background: '#219EBC', border: 12 }}>
                            Search
                        </Button>
                    </div>
                </div>
            </div>
            <div className={`${styles.content} df container`}>
                <span>
                    <Filter />
                </span>
                <span className={`${styles.smarts} dfc`}>
                    {data
                        ? data.iphone.map(teh => (
                              <Block data={teh} key={teh.id} />
                          ))
                        : ''}
                </span>
            </div>
        </main>
    );
}
