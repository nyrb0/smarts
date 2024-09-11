'use client';
import stFil from '@/styles/componentsModules/Filter.module.scss';
import filIcon from '@/icons/filter.png';
import Image from 'next/image';
import { useState } from 'react';
import Radio from '@/UI/CustomRadio/Radio';

type optionsT = {
    price: number;
    storage: number;
    camera: number;
};

const Filter = () => {
    const [selectCamera, setSelectCamera] = useState<number | null>(null);
    const [selectPrice, setSelectPrice] = useState<number | null>(null);
    const [selectStorage, setSelectStorage] = useState<number | null>(null);

    const changePrice = (value: number) => {
        setSelectPrice(value);
    };
    const changeCamera = (value: number) => {
        setSelectCamera(value);
    };
    const changeStorage = (value: number) => {
        setSelectStorage(value);
    };
    const storages = [32, 64, 128, 512];
    const camera = [1, 2, 3];
    const price = [60000, 70000, 80000, 100000, 120000];

    return (
        <div className={stFil.filters}>
            <div className={stFil.wrapper}>
                <div className={`${stFil.name} df`}>
                    <span>
                        <Image src={filIcon} alt={'fda'} />
                    </span>
                    <span className={stFil.fil}>Filters</span>
                </div>
                {/* <Radio
                    options={price}
                    selected={selectPrice}
                    onChange={changePrice}
                /> */}
                {/* <Radio
                    options={camera}
                    selected={selectCamera}
                    onChange={changeCamera}
                />
                <Radio
                    options={storages}
                    selected={selectStorage}
                    onChange={changeStorage}
                /> */}
            </div>
        </div>
    );
};

export default Filter;
