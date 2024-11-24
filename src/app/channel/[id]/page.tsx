'use client';

import stylesChannel from '@/styles/PagesModules/channel/Channel.module.scss';
// modules
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
//icons
import TgIcon from '@/app/assets/img/social/tg.png';
import InsIcon from '@/app/assets/img/social/ins.png';
import TtIcon from '@/app/assets/img/social/tt.png';
import VkIcon from '@/app/assets/img/social/vk.png';
import { TfiWorld } from 'react-icons/tfi';
import { TfiEmail } from 'react-icons/tfi';
import { IoPersonSharp } from 'react-icons/io5';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { ImStatsBars2 } from 'react-icons/im';
import { CiCalendarDate } from 'react-icons/ci';
import { BiWorld } from 'react-icons/bi';
import { RiShareForwardLine } from 'react-icons/ri';
import { MdEmojiFlags } from 'react-icons/md';
import { IoNotifications } from 'react-icons/io5';
import { IoNotificationsOffSharp } from 'react-icons/io5';

// components
import { ChannelTypes } from '@/shared/types/User/Channel.types';
import Btn from '@/shared/UI/Button/Button';
import CurrencyContext from '@/shared/context/currency/CurrencyContext';
import Modal from '@/shared/UI/Modal/Modal';
import Block from '@/Entities/Block/Block';
import { observer } from 'mobx-react-lite';
import user from '@/app/store/user/user';
import { usePathname } from 'next/navigation';
import Search from '@/shared/UI/Search/Search';
import styled from 'styled-components';
import { FaBedPulse } from 'react-icons/fa6';
import ShereSocial from '@/shared/components/Shere/ShereSocial';
import channelStore from '@/app/store/channel/channelStore';
import LoadImage from '@/shared/components/LoadImage/LoadImage';
import EditChannel from '../../../Entities/channel/components/EditChannel';

const { format } = new Intl.NumberFormat('ru-RU', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
});

const StyledButton = styled.button`
    background-color: #323232;
    padding: 10px;
    color: #fff;
    border-radius: 15px;
`;
const ProfileChannel = observer(({ data, setOpen, openEdit }: { data: ChannelTypes; setOpen: () => void; openEdit: () => void }) => {
    const [openEditImage, setOpenEditImage] = useState(false);
    const { userFullData, toggleSubscribe } = user;
    if (!userFullData) return null;
    const [isActive, setIsActive] = useState(userFullData.subscriptions.some(s => s === data.nick_name));
    const [isNotificationOfChannel, setIsNotificationOfChannel] = useState<boolean>(data.notification);
    const handleSubscribe = async () => {
        await toggleSubscribe(data.nick_name, { subsrcibes: userFullData.subscriptions, id: userFullData.id });
    };
    const keysSocial = Object.keys(data.social);
    const eachLinksCount = keysSocial.reduce((acc, key) => (data.social[key as keyof typeof data.social] ? acc + 1 : acc), 0);
    if (!userFullData) return;
    const isOwner = userFullData.userName === data.author;

    return (
        <div className={`${stylesChannel.profile}  dfa`}>
            <img src={data.image_profile} alt='Profile channel' onClick={() => setOpenEditImage(true)} />
            <LoadImage
                currentImagge={data.image_profile}
                stateOpen={{ state: openEditImage, close: () => setOpenEditImage(false) }}
                pathLoad={`channel/fa3sf`}
                body={'image_profile'}
            />
            <div className={stylesChannel.info}>
                <div className={stylesChannel.name}>
                    <p>{data.name}</p>
                </div>
                <p className={stylesChannel.nick}>
                    {data.nick_name} • {format(data.subsrcibes).slice(0, -1)} • {data.tenology.length} товаров
                </p>
                <div className={`${stylesChannel.moreInfo} df`}>
                    <p>Подробнее о канале</p> <p onClick={setOpen}>...еще </p>
                </div>
                <div className={`${stylesChannel.mainUrl}`}>
                    {data.main_url ? (
                        <>
                            <a href={data.main_url}>{data.main_url}</a> <span onClick={setOpen}>и еще {eachLinksCount - 1} ссылки</span>
                        </>
                    ) : null}
                </div>
                <div className={stylesChannel.subscription}>
                    {!isOwner ? (
                        <div className='df' style={{ gap: 10 }}>
                            <div className={`${stylesChannel.btn}`}>
                                <Btn
                                    onClick={() => {
                                        setIsActive(active => !active);
                                        handleSubscribe();
                                    }}
                                    style={{
                                        background: isActive ? 'transparent' : '#000',
                                        color: isActive ? '#000' : '#fff',
                                        border: 6,
                                    }}
                                >
                                    {!isActive ? 'Подписаться' : 'Отписаться'}
                                </Btn>
                            </div>
                            <div style={{ width: 35, height: 30 }}>
                                <Btn
                                    onClick={() => {
                                        setIsActive(active => !active);
                                        handleSubscribe();
                                    }}
                                    style={{
                                        background: isActive ? 'transparent' : '#000',
                                        color: isActive ? '#000' : '#fff',
                                        border: 6,
                                    }}
                                >
                                    <span className='dfca'>{isNotificationOfChannel ? <IoNotificationsOffSharp /> : <IoNotifications />}</span>
                                </Btn>
                            </div>
                        </div>
                    ) : (
                        <div className={stylesChannel.btn}>
                            <Btn
                                onClick={() => openEdit()}
                                style={{
                                    background: 'transparent',
                                    color: '#000',
                                    border: 6,
                                }}
                            >
                                <span style={{ fontSize: 14 }}>Редактировать</span>
                            </Btn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const ChannelPage = ({ params: { id } }: { params: { id: string } }) => {
    const [data, setData] = useState<ChannelTypes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const shareText = `Привет это канал ${data?.name}, мы открылись!!`;
    const [isOpen, setIsOpen] = useState({ isOpenAbout: false, isShere: false });
    const [isEdit, setIsEdit] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [isOpenAbout, setIsOpenAbout] = useState(false);
    // const [isShere, setShere] = useState(false);
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;
    const icons = {
        tg: TgIcon,
        vk: VkIcon,
        tt: TtIcon,
        ins: InsIcon,
        offical: InsIcon,
    };
    const nameSocial = {
        tg: 'Телеграмм',
        vk: 'ВКонтакте',
        tt: 'TikTok',
        ins: 'Instagram',
        offical: 'Официальный сайт',
    };

    const handlerChange = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/api/channel/${id}`);
                setData(response.data);
            } catch (e) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);
    const { userFullData } = user;
    const pathName = usePathname();
    if (!data || !userFullData) return null;
    channelStore.viewUp(data.id, data.view);
    const keySocial = Object.keys(data.social);
    const isOwner = userFullData.userName === data.author;

    const EmailComponents = () => {
        const [viewEmail, setViewEmail] = useState(false);
        return (
            <>
                {!viewEmail && (
                    <StyledButton
                        onClick={() => {
                            setViewEmail(true);
                            // setIsOpen(prev => ({ ...prev, isOpenAbout: true }));
                        }}
                    >
                        Показать адресс электронной почты
                    </StyledButton>
                )}
                {viewEmail && <p>{data.email}</p>}
            </>
        );
    };

    return (
        <div className={`${stylesChannel.channel} container`}>
            <Modal isOpen={isOpen.isOpenAbout} close={() => setIsOpen(prev => ({ isShere: false, isOpenAbout: false }))}>
                <div className={stylesChannel.about}>
                    <div className={stylesChannel.share}>
                        <ShereSocial
                            textShare={shareText}
                            theUrl={location.href}
                            isOpen={isOpen.isShere}
                            maxWidth={480}
                            close={() => setIsOpen(prev => ({ ...prev, isShere: false }))}
                            indexUp={1}
                        />
                    </div>
                    <h3>О канале</h3>
                    <p className={stylesChannel.desc}>
                        <span>{data.desciption}</span>
                    </p>
                    <div className={stylesChannel.links}>
                        <h4>Ссылки</h4>
                        <div>
                            {keySocial.map(key => {
                                const socialLink = data.social[key as keyof typeof data.social];
                                if (!socialLink) return null;
                                return (
                                    <div key={key} className={`${stylesChannel.social} dfa`}>
                                        <Image src={icons[key as keyof typeof icons]} width={30} height={30} alt='Соц сети' />
                                        <div>
                                            <p>{nameSocial[key as keyof typeof nameSocial]}</p>
                                            <a href={socialLink}>{socialLink}</a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <h3 style={{ marginTop: 20 }}>О канале</h3>
                    <div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <TfiEmail />
                            <EmailComponents />
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <TfiWorld />
                            <a href={`${location.origin}${pathName}`}>
                                {location.origin}
                                {pathName}
                            </a>
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <IoPersonSharp /> <p>{format(data.subsrcibes).slice(0, -1)} подписчиков</p>
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <BiSolidShoppingBags /> <p>{data.tenology.length} товаров</p>
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <ImStatsBars2 /> <p>{data.view} просмотров</p>
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <CiCalendarDate /> <p>Дата регистрации: {data.date}</p>
                        </div>
                        <div className={`${stylesChannel.aboutChannel} dfa`}>
                            <BiWorld /> <p>{data.country}</p>
                        </div>
                    </div>
                    <div className={`${stylesChannel.btnsModal} dfj`}>
                        <StyledButton onClick={() => setIsOpen(prev => ({ ...prev, isShere: true }))} className='dfa' style={{ gap: 10 }}>
                            <RiShareForwardLine size={20} />
                            Поделиться каналом
                        </StyledButton>
                        {isOwner && (
                            <StyledButton onClick={() => {}} className='dfa' style={{ gap: 10 }}>
                                <MdEmojiFlags size={20} />
                                Пожаловаться на канал
                            </StyledButton>
                        )}
                    </div>
                </div>
            </Modal>
            <EditChannel openClose={{ open: isEdit, close: () => setIsEdit(false) }} data={data} />
            <ProfileChannel openEdit={() => setIsEdit(true)} data={data} setOpen={() => setIsOpen(prev => ({ ...prev, isOpenAbout: true }))} />
            <div className={stylesChannel.search}>
                <Search value={searchValue} onChanges={handlerChange} placeholder={'поиск'} onKeyDown={() => null} />
            </div>
            <div className={`${stylesChannel.addProduct} dfc`}>
                <span>
                    <Btn
                        onClick={() => null}
                        style={{
                            background: 'transparent',
                            color: '#000',
                            border: 6,
                        }}
                    >
                        <span style={{ fontSize: 14 }}>Добавить товар</span>
                    </Btn>
                </span>
            </div>
            <div className={`${stylesChannel.smarts} dfc`}>
                <CurrencyContext>
                    {data.tenology.map(teh => (
                        <Block data={teh} key={teh.id} />
                    ))}
                </CurrencyContext>
            </div>
        </div>
    );
};

export default ChannelPage;
