'use client';

import { Metadata } from 'next';
import { logOut } from '../constant/isValid';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';

const Profile = observer(() => {
    const logOutHandler = (c: string) => {
        logOut(c);
    };

    const router = useRouter();

    // if (Cookies.get('fd')) return

    return (
        <div>
            <button onClick={() => logOutHandler('userData1')}>Log out</button>
        </div>
    );
});

export default Profile;
