'use client';
import styles from '@/styles/PagesModules/Home.module.scss';
import Image from 'next/image';
import phone from '@/icons/bigPhone.png';
import CusSelect from '@/shared/UI/Select/CusSelect';
import Button from '@/shared/UI/Button/Button';
import { IphoneArr, Phone, PopularArr } from '@/shared/types/Phones/TypePhone.types';
import Block from '@/Entities/Block/Block';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from '@/components/Filters/Filter';
import Select from '@/shared/UI/Select/Select Filter/Select';
import { observer } from 'mobx-react-lite';
import Global from '../store/GlobalStorage/Global';

const Home = observer(() => {
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

    const selected = Global;

    async function getData() {
        const res = await axios(`http://localhost:3000/${selected.selecred}`);
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
    }, [selected.selecred]);

    const changeSel = (s: string) => {
        selected.setSelected(s);
    };
    return (
        <main className={styles.home}>
            <div className={styles.topPhones}></div>
            <div className={`${styles.content} df container`}>
                <span>
                    <Select onChange={changeSel} selected={selected.selecred} name={'Brand'} values={brands}></Select>
                </span>
                <span className={`${styles.smarts} dfc`}>
                    {data?.map(teh => (
                        <Block data={teh} key={teh.id} />
                    ))}
                </span>
            </div>
            <div className={styles.review}></div>
        </main>
    );
});
export default Home;
