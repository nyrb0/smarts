'use client';

//  style
import styleSaved from '@/styles/PagesModules/profile/Saved.module.scss';

// modules
import { FC } from 'react';

// store
import { observer } from 'mobx-react-lite';
import cartProducts from '@/app/store/cart/cartProducts';
import Block from '@/components/Block/Block';
import user from '@/app/store/user/user';

const Saved: FC = () => {
    return (
        <div>
            {user.userFullData?.saved.map(s => (
                <Block key={s.id} data={s} />
            ))}
        </div>
    );
};

export default observer(Saved);
