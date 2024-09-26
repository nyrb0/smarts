'use client';

// styles
import styleEdit from '@/styles/PagesModules/profile/Edit.module.scss';

// UI
import Input from '@/UI/Search/Search';

// modules
import { FC, useState } from 'react';
import styled from 'styled-components';

interface EditI {}

const Edit: FC<EditI> = ({}) => {
    const [dataInt, setDataInt] = useState<{
        name: string;
        lastName: string;
        email: string;
        city: string;
        number: string;
        country: string;
        description: string;
    }>({
        name: '',
        lastName: '',
        email: '',
        city: '',
        number: '',
        country: '',
        description: '',
    });

    const chageName = (e: string) => {
        setDataInt(prev => ({ ...prev, name: e }));
    };
    const chageSurName = (e: string) => {
        setDataInt(prev => ({ ...prev, name: e }));
    };

    const toServer = async () => {
        try {
            fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: dataInt.name }),
            });
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className={styleEdit.edit}>
            <h3>Edit Profile</h3>
            <Input onChanges={chageName} value={dataInt.name} placeholder={'Имя'} type={'text'} />
            <button onClick={toServer}>dfsfsdfvhusdfh</button>
        </div>
    );
};

export default Edit;
