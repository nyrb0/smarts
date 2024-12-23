'use client';
// styles
import style from '@/styles/PagesModules/HomeItem.module.scss';

// types
import { Comments, Phone, Photos, ReviewCount } from '@/shared/types/Phones/TypePhone.types';

// modules
import Image from 'next/image';
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
// img
import CPUicon from '@/shared/icons/characteristic/Screensize.png';
import CameraIcon from '@/shared/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (2).png';
import FrontCamera from '@/shared/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (3).png';
import BatteryIcon from '@/shared/icons/characteristic/smartphone-rotate-2-svgrepo-com 2 (4).png';
import { CiCirclePlus } from 'react-icons/ci';
import Mark from '@/shared/image/gif/mark ok.gif';

// componnents
import Btn from '@/shared/UI/Button/Button';
import Button from '@/shared/UI/Button/ButtonStorage/Button';
import styled from 'styled-components';
import Comment from '@/Entities/comment/Comment';

// Global state
import cartProducts from '@/app/store/cart/cartProducts';
import { observer } from 'mobx-react-lite';
import user from '@/app/store/user/user';

// UI
import Modal from '@/shared/UI/Modal/Modal';
import Review from '@/Entities/Review/Review';
import { Rating } from '@mui/material';
import { generateId } from '@/Features/generateId';
import { currencyChoose } from '@/Features/CurrencyChoose';
import CurrencyContext, { CurrencyCon } from '@/shared/context/currency/CurrencyContext';
import Channel from './components/Channel/Channel';
import PhotoComment from '@/Entities/comment/PhotoComment/PhotoComment';
import SwiperPhotos from '@/shared/UI/swiperPhotos/SwiperPhotos';

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

const CurrencyComponent: FC<{ data: Phone }> = ({ data }) => {
    const context = useContext(CurrencyCon);
    if (!context) throw new Error('Error in context Currency');

    const { currency } = context;
    return (
        <>
            {currency === 'rub' ? data?.price?.rub : currency === 'som' ? data?.price?.som : data?.price?.usd}
            {currencyChoose(currency)}
        </>
    );
};

const PageGlobalItem: FC<PageGlobalDinamic> = observer(({ params: { id } }) => {
    const [data, setData] = useState<Phone | null>(null);
    const [chooseColors, setChooseColors] = useState<'gold' | 'black' | 'url' | 'gray'>('black');
    const [chooseStorage, setChooseStorage] = useState<string>('');
    const [warning, setWarning] = useState('');
    const [warningTime, setWarningTime] = useState<boolean>(false);
    const [activeStorage, setActiveStorage] = useState<null | number>(null);
    const [thank, setThank] = useState<boolean>(false);
    const [image, setImage] = useState('');
    const [isSelectedProductsImage, setIsSelectedProductsImage] = useState<number>(0);
    const [stars, setStars] = useState(0);
    const [nextStart, setNextStars] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [commentPhoto, setCommetPhoto] = useState<Photos[]>([]);
    const [currentInitialSlide, setCurrentInitialSlide] = useState<number>(0);
    const [slidePhoto, setSlidePhoto] = useState<{ slides: Photos[]; isOpen: boolean }>({ slides: [], isOpen: false });
    const userAboutData = user.userData;
    const userCookie = localStorage.getItem('userData1') || '';
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
                    photos: commentPhoto,
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

    // function duplicate(word: string) {
    //     const obj: { [key: string]: number } = {};
    //     word.split('').forEach(w => {
    //         if (obj[w]) {
    //             obj[w] = (obj[w] || 0) + 1;
    //         }
    //     });
    //     return obj;
    // }
    // function duplicateEncode2(word: string) {
    //     word = word.toLowerCase();
    //     return word
    //         .split('')
    //         .map((alone, _, arr) => (arr.filter(f => f === alone).length === 1 ? '(' : ')'))
    //         .join('');
    // }

    const handleFilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const previews = selectedFiles.map(file => ({ id: String(Date.now()), img: URL.createObjectURL(file) }));
            setCommetPhoto(prev => [...prev, ...previews]);
        }
    };
    const handleDeleteFilePhoto = (id: string) => {
        setCommetPhoto(prev => prev.filter(p => p.id !== id));
    };

    console.log(slidePhoto);

    useEffect(() => {
        getDataDinamic();
    }, []);

    if (!data) return;
    const TopImagesTechnolagy = () => {
        return (
            <div>
                {Object.keys(data.image.black).map((colorsImage, index) => {
                    const theImage = data.image?.[chooseColors][colorsImage as keyof typeof data.image.black];
                    return (
                        <div key={colorsImage}>
                            <Image
                                onClick={() => {
                                    if (isSelectedProductsImage !== index) {
                                        setImage(theImage);
                                        setIsSelectedProductsImage(index);
                                    }
                                }}
                                width={74}
                                height={93}
                                src={theImage}
                                alt='iphones'
                                style={{ opacity: isSelectedProductsImage === index ? 1 : 0.6 }}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <Modal isOpen={warningTime} visibleX={false}>
                <div className={style.warning}>{warning}</div>
            </Modal>
            <div className={style.itemPhone}>
                <div className={`${style.containerBlock} container`}>
                    <div className={`dfj dfa`}>
                        <TopImagesTechnolagy />
                        <div>
                            <Image
                                src={image || data?.image?.[chooseColors][1]}
                                alt={data.name}
                                width={300}
                                height={516}
                                className={style.phoneImage}
                                // layout='responsive'
                            />
                        </div>
                    </div>
                    <div className={style.info}>
                        <h1 className={style.namePhone}>{data.name}</h1>
                        <div className={style.price}>
                            <CurrencyContext>
                                <CurrencyComponent data={data} />
                            </CurrencyContext>
                        </div>
                        <div className={`${style.color} dfa`}>
                            <span>Выберите цвет:</span>
                            {Object.keys(data.image).map(c => {
                                return (
                                    c !== 'url' && (
                                        <CircleColors
                                            key={c}
                                            color={c}
                                            onClick={() => {
                                                data.selected.color = c;
                                                setImage(data.image?.[chooseColors][c as keyof typeof data.image.black]);
                                                setChooseColors(c as keyof typeof data.image);
                                            }}
                                        />
                                    )
                                );
                            })}
                        </div>
                        <div className={style.storage}>
                            {storages.map((s, i) => (
                                <Button
                                    key={s}
                                    onClick={() => {
                                        activeStorageSet(i);
                                        data.selected.storage = s;
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
                                Apple iPhone 16 Pro Max - это новинка, которая безусловно привлечет внимание ценителей высокотехнологичных гаджетов.
                                Принадлежащий к высшему сегменту рынка смартфон от компании Apple обеспечивает пользователей передовыми возможностями
                                и функциональностью, которая превосходит многие другие модели на рынке.
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
                                        Лайкать
                                    </Btn>
                                </div>
                                <div className={style.btn}>
                                    <Btn
                                        style={{
                                            background: 'black',
                                            border: 6,
                                        }}
                                        onClick={() => {
                                            addToCart(data);
                                        }}
                                    >
                                        В покупку
                                    </Btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${style.channel} container`}>
                <Channel id={data.channel.id} />
            </div>
            <div className={`${style.review} container`}>
                <Review dataAboutRev={data.review} comments={data.comments} />
                <div className={style.comment}>
                    <input type='text' placeholder='Оставь комментарии' onChange={changeValueComment} value={commentValue} />
                    <div className={style.addPhoto}>
                        <input style={{ display: 'none' }} type='file' id='commentPhoto' onChange={handleFilePhoto} />
                        <div className={`${!commentPhoto.length ? 'dfc' : 'dfa'}`}>
                            <div className={`${style.photos} df`}>
                                {commentPhoto.map(photo => (
                                    <PhotoComment
                                        data={photo.img}
                                        alt={'фото коммента'}
                                        deleteClick={() => handleDeleteFilePhoto(photo.id)}
                                        key={photo.id}
                                    />
                                ))}
                            </div>
                            <label htmlFor='commentPhoto'>
                                <CiCirclePlus size={50} />
                            </label>
                        </div>
                    </div>
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
            <div className={`${style.commentItems} container`}>
                {data.comments?.map((c, i) => (
                    <Comment
                        onChangePhotos={index => setCurrentInitialSlide(index)}
                        com={c}
                        key={i}
                        deleteCom={deleteComent}
                        userCommnent={userCookie}
                        onClick={slide => setSlidePhoto({ slides: slide, isOpen: true })}
                    />
                ))}
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
            {slidePhoto.isOpen && (
                <SwiperPhotos
                    initialSlide={currentInitialSlide}
                    data={slidePhoto.slides}
                    onClick={() => setSlidePhoto(prev => ({ ...prev, isOpen: false }))}
                />
            )}
            {/* Блогодорения */}
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
        </>
    );
});

export default PageGlobalItem;
