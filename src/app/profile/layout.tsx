'use client';

import { ReactNode } from 'react';

import { logOut } from '../constant/isValid';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import HeaderImame from '@/image/header.png';
import profieSt from '@/styles/PagesModules/Profile.module.scss';
import Image from 'next/image';
import me from '@/image/me.jpg';

import Cookies from 'js-cookie';

//icons
import { FaCamera } from 'react-icons/fa6';
// import { div } from 'framer-motion/client';

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    const router = useRouter();

    if (!Cookies.get('userData1')) {
        router.push('/auth');
    }
    const logOutHandler = (c: string) => {
        logOut(c);
        location.reload();
    };

    return (
        <div className={profieSt.profile}>
            <div className={profieSt.head}>
                <Image src={HeaderImame} alt='image header' className={profieSt.header} />
                <div className={profieSt.avatar}>
                    <div className={profieSt.image}>
                        <Image src={me} alt='this is my profile avater' className={profieSt.me} />
                        <FaCamera className={profieSt.camera} size={25} fill={'white'} />
                    </div>
                </div>
            </div>
            <div></div>
            <button onClick={() => logOutHandler('userData1')}>Log out</button>
            <div>{children}</div>
        </div>
    );
}
