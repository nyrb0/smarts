'use client';
import styles from '@/styles/PagesModules/Home.module.scss';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import Block from '@/Entities/Block/Block';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import Filter from '@/Entities/Filters/Filter';
import Select from '@/shared/UI/Select/Select Filter/Select';
import { observer } from 'mobx-react-lite';
import Global from '../store/GlobalStorage/Global';
import CurrencyContext, { CurrencyCon } from '@/shared/context/currency/CurrencyContext';

const HomeComponent = observer(() => {
    const [data, setData] = useState<null | Phone[]>(null);

    const context = useContext(CurrencyCon);
    if (!context) throw Error('Error: not context Currency');
    const { currency, handleSaveCurrency } = context;

    // const [currency, setCurrency] = useState(localStorage.getItem('currency') || '');
    // const [popular, setPopular] = useState<Phone[] | null>(null);
    // const [selectModelPhone, setSelectModelPhone] = useState();
    // const brand1 = ['Iphone', 'Huawei', 'Samsung', 'Redmi', 'Pixel'];

    const brand = {
        iphone: 'Iphone',
        huawei: 'Huawei',
        samsung: 'Samsung',
        redmi: 'Redmi',
        pixel: 'Pixel',
        popular: 'popular',
    };
    const currencyList = ['rub', 'som', 'usd'];
    const brands = Object.keys(brand);

    const selected = Global;

    async function getData() {
        const res = await axios(`http://localhost:3000/${selected.selecred}`);
        const data = await res.data;
        setData(data);
    }
    const changeSel = (s: string) => {
        selected.setSelected(s);
    };

    const changeCurrency = (s: string) => {
        handleSaveCurrency(s);
    };

    const okSearch = () => {};

    useEffect(() => {
        getData();
        // getPopular();
    }, [selected.selecred]);

    return (
        <main className={styles.home}>
            <div className={styles.topPhones}></div>
            <div className={`${styles.content} df container`}>
                <div>
                    <span>
                        <Select onChange={changeSel} selected={'currency'} name={'Бренд'} values={brands}></Select>
                    </span>
                    <span>
                        <Select onChange={changeCurrency} selected={currency} name={'Валюта'} values={currencyList}></Select>
                    </span>
                </div>
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

const Home = () => {
    return (
        <CurrencyContext>
            <HomeComponent />
        </CurrencyContext>
    );
};

export default Home;
