'use client';

// styles
import style from '@/styles/PagesModules/HomeItem.module.scss';

// types
import { Comments, Phone, ReviewCount } from '@/types/Phones/TypePhone.types';

// modules
import Image from 'next/image';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// img
import CPUicon from '@/icons/characteristic/Screensize.png';
import CameraIcon from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (2).png';
import FrontCamera from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (3).png';
import BatteryIcon from '@/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (4).png';
import Mark from '@/image/gif/mark ok.gif';

// componnents
import Btn from '@/UI/Button/Button';
import Button from '@/UI/Button/ButtonStorage/Button';
import styled from 'styled-components';
import Comment from '@/components/comment/Comment';

// Global state
import cartProducts from '@/app/store/cart/cartProducts';
import { observer } from 'mobx-react-lite';
import user from '@/app/store/user/user';

// UI
import Modal from '@/UI/Modal/Modal';
import Review from '@/components/Review/Review';
import { Rating } from '@mui/material';
import { generateId } from '@/app/constant/generateId';

interface PageGlobalDinamic {
    params: {
        id: string;
    };
}
type CircleColorsType = {
    color: string;
};

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

const PageGlobalItem: FC<PageGlobalDinamic> = observer(({ params: { id } }) => {
    const [data, setData] = useState<Phone | null>(null);
    const [chooseColors, setChooseColors] = useState<string>('');
    const [chooseStorage, setChooseStorage] = useState<string>('');
    const [warning, setWarning] = useState('');
    const [warningTime, setWarningTime] = useState<boolean>(false);
    const [activeStorage, setActiveStorage] = useState<null | number>(null);
    const [thank, setThank] = useState<boolean>(false);

    const [stars, setStars] = useState(0);
    const [nextStart, setNextStars] = useState(false);

    const [commentValue, setCommentValue] = useState('');
    const userAboutData = user.userData;
    const userCookie = Cookies.get('userData1');

    const colors = ['black', 'purple', 'red', 'yellow', 'white'];
    const storages = ['128', '256', '512', '1024'];

    const date = new Date();

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

    const changeValueComment = (e: ChangeEvent<HTMLInputElement>) => {
        setCommentValue(e.target.value);
    };

    const thankUser = (ms: number) => {
        setThank(true);
        setTimeout(() => {
            setThank(false);
        }, ms);
    };

    async function getDataDinamic() {
        try {
            const res = await fetch(`http://localhost:3000/iphone/${id}`);
            const jsonData = await res.json();
            setData(jsonData);
        } catch (err) {
            throw new Error('Error server backEnd:');
        }
    }

    const closeStars = () => {
        setStars(0);
        setNextStars(false);
    };

    const postComment = async (dataCom: { comment: Comments }, starsStatic?: ReviewCount[]) => {
        try {
            if (!data?.comments) throw new Error('Ошибка при получение предыдущих данных');
            fetch(`http://localhost:3000/iphone/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comments: [...data?.comments, dataCom.comment],
                    review: starsStatic,
                }),
            }).then(res => {
                if (!res.ok) {
                    throw new Error(`Ошибка сервера ${res.status}`);
                } else {
                    closeStars();
                    setCommentValue('');
                    getDataDinamic();
                    thankUser(1500);
                }
            });
        } catch (e) {
            throw e;
        }
    };

    const handleRating = (event: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
        if (newValue) {
            setStars(newValue);
        }
    };

    const nextToStart = () => {
        if (!commentValue.length) return null;
        setNextStars(true);
    };

    const toParseCategory = (s: number) => {
        const stars = 5 - s;
        return data?.review?.map((d, i) => {
            if (i === stars) {
                return { category: d.category, votes: d.votes + 1 };
            }
            return d;
        });
    };
    const toServerComment = (e: any) => {
        e.preventDefault();
        if (userAboutData && stars === 0 && commentValue.length) {
            warningFunc('Пожалуйста поставьте отзыв от 1 до 5', 1000);
            return;
        }
        postComment(
            {
                comment: {
                    id: generateId(),
                    user: userAboutData || null,
                    votesStars: stars,
                    comment: commentValue,
                    date: {
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        hours: date.getHours(),
                        minutes: date.getMinutes(),
                        second: date.getSeconds(),
                    },
                },
            },
            toParseCategory(stars)
        );
    };

    const deleteComent = async (c: string) => {
        try {
            const filterComment = await data?.comments.filter(f => f.id !== c);
            const res = await fetch(`http://localhost:3000/iphone/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comments: filterComment }),
            });
            if (res.ok) {
                console.log('Успешно выполнено:', res);
                getDataDinamic();
            }
        } catch (e) {
            throw e;
        }
    };

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
            <Modal isOpen={nextStart} visibleX close={closeStars}>
                <div className={`${style.rating} dfc`}>
                    <div>
                        <div className={style.stars}>Оцените от 1 до 5:</div>
                        <div className='dfc'>
                            <Rating name='simple-controlled' value={stars} onChange={handleRating} />
                        </div>
                        <div className={style.btn}>
                            <form onSubmit={toServerComment}>
                                <Btn
                                    style={{
                                        background: 'transparent',
                                        color: 'black',
                                        border: 6,
                                    }}
                                    type='submit'
                                >
                                    Отправить
                                </Btn>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className={`${style.review} container`}>
                <Review dataAboutRev={data.review} />
                <div className={style.comment}>
                    <input
                        type='text'
                        placeholder='Оставь комментарии'
                        onChange={changeValueComment}
                        value={commentValue}
                    />
                    <div className={`dfc`}>
                        <span className={style.btn}>
                            <Btn
                                style={{
                                    background: 'transparent',
                                    color: 'black',
                                    border: 6,
                                }}
                                onClick={nextToStart}
                            >
                                Отправить
                            </Btn>
                        </span>
                    </div>
                </div>
            </div>
            <Modal isOpen={thank} visibleX={false}>
                <div className={`${style.thank} dfc`}>
                    <div>
                        <div className='dfc'>
                            <Image src={Mark} alt='mark' />
                        </div>
                        <div className={style.thankText}>Спасибо за ваш отзыв!</div>
                    </div>
                </div>
            </Modal>
            <div className={`${style.commentItems} container`}>
                {data.comments?.map((c, i) => (
                    <Comment com={c} key={i} deleteCom={deleteComent} userCommnent={userCookie} />
                ))}
            </div>
        </>
    );
});

export default PageGlobalItem;
