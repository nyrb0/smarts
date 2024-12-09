'use client';

import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import notificationlGlobalStore from '@/app/store/notificationGlobal/notificationlGlobalStore';
import style from './NotificationGlobal.module.scss';
import Image from 'next/image';
import OkIcon from '@/app/assets/notificatoin/okGif.gif';
import NoOkIcon from '@/app/assets/notificatoin/NotOk.gif';

const NotificationGlobal: FC = observer(() => {
    return (
        <div className={style.wrapper}>
            {notificationlGlobalStore.notification.map(n => (
                <div key={n.id} className={`${style.notification} dfj`}>
                    <div className={style.noti}>
                        <div className={style.x} onClick={() => notificationlGlobalStore.deleteNotification(n.id)}>
                            x
                        </div>
                        <p className={style.title}>{n.title}</p>
                        <p className={style.desc}>{n.desc}</p>
                    </div>
                    <div className={style.status}>
                        <Image src={n.status === 'right' ? OkIcon : NoOkIcon} alt='статус уведомлении' />
                    </div>
                </div>
            ))}
        </div>
    );
});

export default NotificationGlobal;
