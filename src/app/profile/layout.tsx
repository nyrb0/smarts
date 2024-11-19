'use client';

import { ReactNode, useEffect } from 'react';

import { logOut } from '../../Features/isValid';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import HeaderImame from '@/shared/image/header.png';
import profieSt from '@/styles/PagesModules/profile/Profile.module.scss';
import Image from 'next/image';
import me from '@/shared/image/me.jpg';

//icons
import { FaCamera } from 'react-icons/fa6';
import sendProfile from '@/shared//icons/sendProfile.png';
import user from '../store/user/user';
import Link from 'next/link';
// import { div } from 'framer-motion/client';

function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    const router = useRouter();

    if (!localStorage.getItem('userData1')) {
        router.push('/auth');
    }
    const logOutHandler = (c: string) => {
        logOut(c);
        location.reload();
    };

    const menu = {
        aboutme: 'Обо мне',

        edit: 'Редактирование',
        notifications: 'Уведомления',
        saved: 'Сохраненные',
        security: 'Безопасность',
    };

    return (
        <div className={`${profieSt.profile} `}>
            <div className={profieSt.head}>
                <Image src={HeaderImame} alt='image header' className={profieSt.header} />
                <div className={`${profieSt.avatar} dfa container`}>
                    <div className={profieSt.image}>
                        <Image src={me} alt='this is my profile avatar' className={profieSt.me} />
                        <FaCamera className={profieSt.camera} size={25} fill={'white'} />
                    </div>
                    <div className={`${profieSt.info} dfa`}>
                        <div>
                            <div className={profieSt.userName}>
                                {user.userFullData?.name && user.userFullData?.lastName
                                    ? `${user.userFullData?.name} ${user.userFullData.lastName}`
                                    : 'Неизвестно'}
                            </div>
                            <div className={profieSt.aboutme}>Крутая цитата в мире </div>
                        </div>
                        <Image src={sendProfile} alt='Cсылка на профиль' />
                    </div>
                </div>
            </div>
            <div className={`${profieSt.content} container df`}>
                <div className={`${profieSt.menu} df`}>
                    <nav>
                        <ul>
                            {Object.keys(menu).map(m => {
                                const paths = `/profile/${m}`;
                                return (
                                    <li className='dfa' key={m}>
                                        <Link href={paths}>{menu[m as keyof typeof menu]}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div style={{ width: '100%' }}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default observer(RootLayout);
