'use client';
import style from '@/styles/PagesModules/HomeItem.module.scss';
import { Phone } from '@/types/Phones/TypePhone.types';
import Button from '@/UI/Button/ButtonStorage/Button';
import Btn from '@/UI/Button/Button';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import CPUicon from '@/icons/characteristic/Screensize.png';
import CameraIcon from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (2).png';
import FrontCamera from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (3).png';
import BatteryIcon from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (4).png';

// Global state
import cartProducts from '@/app/store/cart/cartProducts';
import { observer } from 'mobx-react-lite';
import Modal from '@/UI/Modal/Modal';

import Cookies from 'js-cookie';
import Review from '@/components/Review/Review';

interface PageGlobalDinamic {
    params: {
        id: string;
    };
}
type CircleColorsType = {
    color: string;
};

const PageGlobalItem: FC<PageGlobalDinamic> = observer(({ params: { id } }) => {
    const [data, setData] = useState<Phone | null>(null);
    const [chooseColors, setChooseColors] = useState<string>('');
    const [chooseStorage, setChooseStorage] = useState<string>('');
    const [warning, setWarning] = useState('');
    const [warningTime, setWarningTime] = useState<boolean>(false);
    const [activeStorage, setActiveStorage] = useState<null | number>(null);

    async function getDataDinamic() {
        try {
            const res = await fetch(`http://localhost:3000/iphone/${id}`);
            const jsonData = await res.json();
            setData(jsonData);
        } catch (err) {
            throw new Error('Error server backEnd:');
        }
    }

    const CircleColors = styled.div<CircleColorsType>`
        background: ${props => props.color};
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-right: 8px;
        &:hover {
            outline: 1.3px solid black;
        }
    `;

    const colors = ['black', 'purple', 'red', 'yellow', 'white'];
    const storages = ['128', '256', '512', '1024'];

    // const chooseHandler = (s: string) => {
    //     setChooseColors(prev => [...prev, s]);
    // };

    const warningFunc = (theWarning: string, ms: number) => {
        setWarningTime(true);
        setWarning(theWarning);
        setTimeout(() => {
            setWarningTime(false);
        }, ms);
    };
    const addStorage = (s: string) => {
        setChooseStorage(s);
    };
    const addToCart = (p: Phone) => {
        if (!chooseStorage.length) {
            warningFunc('Выберите Емкость', 2000);
            return;
        } else if (!chooseColors.length) {
            warningFunc('Выберите цвет', 2000);
            return;
        }
        cartProducts.addToProduct(p);
    };
    const activeStorageSet = (index: number) => {
        setActiveStorage(index);
    };

    console.log(Cookies.get('userData1'));

    useEffect(() => {
        getDataDinamic();
    }, []);
    if (!data) return;

    return (
        <>
            <Modal isOpen={warningTime} visibleX={false}>
                <div className={style.warning}>{warning}</div>
            </Modal>
            <div className={style.itemPhone}>
                <div className={`${style.containerBlock} container`}>
                    <div className={style.phoneImage}>
                        <Image
                            src={data?.image.url}
                            alt={data.name}
                            width={300}
                            height={516}
                            // layout='responsive'
                        />
                    </div>
                    <div className={style.info}>
                        <h1 className={style.namePhone}>{data.name}</h1>
                        <div className={style.price}>{data.price.rub}</div>
                        <div className={`${style.color} dfa`}>
                            <span>Select colors:</span>
                            {colors.map(c => (
                                <CircleColors key={c} color={c} onClick={() => setChooseColors(c)} />
                            ))}
                        </div>
                        <div className={style.storage}>
                            {storages.map((s, i) => (
                                <Button
                                    key={s}
                                    onClick={() => {
                                        activeStorageSet(i);
                                        addStorage(s);
                                    }}
                                    border={activeStorage === i ? '1px solid black' : ''}
                                >
                                    {s}
                                    Gb
                                </Button>
                            ))}
                        </div>
                        <div className={style.moreInformation}>
                            <div className={style.itemInfo}>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={CPUicon} alt='GPU icon' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>CPU</div>
                                        <div className={style.value}>{data.processor}</div>
                                    </div>
                                </div>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={CameraIcon} alt='Main camera' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>CPU</div>
                                        <div className={style.value}>{data.camera}</div>
                                    </div>
                                </div>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={BatteryIcon} alt='battery icon' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>Batter capacity</div>
                                        <div className={style.value}>
                                            {data.battery}
                                            mAh
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={BatteryIcon} alt='battery icon' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>Batter capacity</div>
                                        <div className={style.value}>
                                            {data.battery}
                                            mAh
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={BatteryIcon} alt='battery icon' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>Batter capacity</div>
                                        <div className={style.value}>
                                            {data.battery}
                                            mAh
                                        </div>
                                    </div>
                                </div>
                                <div className={`${style.item} dfca`}>
                                    <div className={style.img}>
                                        <Image src={BatteryIcon} alt='battery icon' />
                                    </div>
                                    <div className={style.charec}>
                                        <div className={style.chapter}>Batter capacity</div>
                                        <div className={style.value}>
                                            {data.battery}
                                            mAh
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.desc}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores architecto vel
                                accusamus cumque. Tempora esse vitae odit sed sapiente? Aspernatur provident magni
                                asperiores officia magnam. Labore, quae, aperiam iusto consectetur repellat totam rerum
                                similique nemo.
                            </div>
                            <div className={`${style.btns} df`}>
                                <div className={style.btn}>
                                    <Btn
                                        style={{
                                            background: 'transparent',
                                            color: 'black',
                                            border: 6,
                                        }}
                                    >
                                        Add to liked
                                    </Btn>
                                </div>
                                <div
                                    className={style.btn}
                                    onClick={() => {
                                        addToCart(data);
                                    }}
                                >
                                    <Btn
                                        style={{
                                            background: 'black',
                                            border: 6,
                                        }}
                                    >
                                        Add to Card
                                    </Btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.review}>
                <Review />
            </div>
        </>
    );
});

export default PageGlobalItem;
