import Image from 'next/image';
import style from './Channel.module.scss';
import Btn from '@/shared/UI/Button/Button';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { ChannelTypes } from '@/shared/types/channel/Channel.types';
import user from '@/app/store/user/user';
import { useRouter } from 'next/navigation';

interface ChannelProps {
    id: string;
}

interface IsSubsBtnProps {}

const Channel: FC<ChannelProps> = observer(({ id }) => {
    const [data, setData] = useState<ChannelTypes>();
    const { userFullData, toggleSubscribe } = user;

    useEffect(() => {
        (async () => {
            const data = await axios(`/api/channel/${id}`);
            setData(data.data);
        })();
    }, []);
    const owner = user.userFullData?.userName;
    const navigation = useRouter();

    if (!data || !userFullData) return;
    const isOwner = owner === data.author;
    const isSubscription = user.userFullData?.subscriptions.includes(data.nick_name);

    const IsSubsBtn = () => {
        const [isSubs, setIsSubs] = useState(isSubscription);

        const handlerClick = () => {
            if (!isOwner) {
                navigation.push(`/channel/${id}`);
            } else {
                setIsSubs(prev => !prev);
                toggleSubscribe(data.nick_name, { subsrcibes: userFullData?.subscriptions, id: userFullData.id });
            }
        };

        return (
            <>
                <Btn
                    onClick={handlerClick}
                    style={{
                        background: isSubs ? 'transparent' : '#000',
                        color: isSubs ? 'black' : '#fff',
                        border: 6,
                    }}
                >
                    Подписаться
                </Btn>
            </>
        );
    };

    return (
        <div className={`${style.channel} dfj `}>
            <div className={`${style.left} dfa`}>
                <img src={data.image_profile} alt={data.name} />
                <p className={style.name}>{data.name}</p>
                <p className={style.subscribers}>{data.subsrcibes}</p>
            </div>
            <div className={style.channel}>
                <IsSubsBtn />
            </div>
        </div>
    );
});

export default Channel;
