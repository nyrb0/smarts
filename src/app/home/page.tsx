'use client';
import styles from '@/styles/PagesModules/Home.module.scss';
import Image from 'next/image';
import phone from '@/icons/bigPhone.png';
import CusSelect from '@/UI/Select/CusSelect';
import Button from '@/UI/Button/Button';
import { IphoneArr, Phone, PopularArr } from '@/types/Phones/TypePhone.types';
import Block from '@/components/Block/Block';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '@/components/Filters/Filter';
import Select from '@/UI/Select/Select Filter/Select';

const Home = () => {
    const [data, setData] = useState<null | Phone[]>(null);
    const [popular, setPopular] = useState<Phone[] | null>(null);
    const [selectModelPhone, setSelectModelPhone] = useState();
    const brand1 = ['Iphone', 'Huawei', 'Samsung', 'Redmi', 'Pixel'];
    const brand = {
        iphone: 'Iphone',
        huawei: 'Huawei',
        samsung: 'Samsung',
        redmi: 'Redmi',
        pixel: 'Pixel',
        popular: 'popular',
    };
    const brands = Object.keys(brand);

    const [selected, setSelected] = useState<string>('popular');

    async function getData() {
        const res = await axios(`http://localhost:3000/${selected}`);
        const data = await res.data;
        setData(data);
    }
    // async function getPopular() {
    //     const res = await axios(`http://localhost:3000/popular`);
    //     const data = await res.data;
    //     setPopular(data);
    // }
    useEffect(() => {
        getData();
        // getPopular();
    }, [selected]);

    const changeSel = (s: string) => {
        setSelected(s);
    };

    return (
        <main className={styles.home}>
            <div className={styles.topPhones}></div>

            <div className={`${styles.content} df container`}>
                <span>
                    <Select onChange={changeSel} selected={selected} name={'Brand'} values={brands}></Select>
                </span>
                <span className={`${styles.smarts} dfc`}>
                    {data ? data.map(teh => <Block data={teh} key={teh.id} />) : null}
                </span>
            </div>
        </main>
    );
};
export default Home;
