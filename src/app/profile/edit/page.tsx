'use client';

import user from '@/app/store/user/user';
// styles
import styleEdit from '@/styles/PagesModules/profile/Edit.module.scss';
import { usersType } from '@/shared/types/User/User.types';

// UI
import Input from '@/shared/UI/Search/Search';
import axios from 'axios';

// modules
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

interface EditI {}
const Edit: FC<EditI> = ({}) => {
    const [users, setUsers] = useState<usersType>();
    const [dataInt, setDataInt] = useState({
        name: '',
        education: '',
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
        setDataInt(prev => ({ ...prev, lastName: e }));
    };
    const changeEducation = (e: string) => {
        setDataInt(prev => ({ ...prev, education: e }));
    };

    const changeEmail = (e: string) => {
        setDataInt(prev => ({ ...prev, email: e }));
    };
    const changeNumber = (e: string) => {
        setDataInt(prev => ({ ...prev, number: e }));
    };
    const changeCountry = (e: string) => {
        setDataInt(prev => ({ ...prev, country: e }));
    };
    const changeCity = (e: string) => {
        setDataInt(prev => ({ ...prev, city: e }));
    };

    // const searchFind = ()=>{
    //     user.userFullData
    // }
    console.log(user.userFullData?.name);

    const toServer = async () => {
        try {
            fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataInt),
            });
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        const get = async () => {
            try {
                const resFromserver = await axios('http://localhost:3000/user');

                if (resFromserver) {
                    setUsers(resFromserver.data);
                }
            } catch (err) {
                throw err;
            }
        };
        get();
    }, []);

    return (
        <div className={styleEdit.edit}>
            <h3>Edit Profile</h3>
            <div className={`${styleEdit.editProfile} df`}>
                <div>
                    <div className={styleEdit.part}>Персонал</div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block} style={{ marginRight: 20 }}>
                            <div className={styleEdit.field}>Имя</div>
                            <div className={styleEdit.input}>
                                <Input onChanges={chageName} value={dataInt.name} placeholder={'Имя'} type={'text'} />
                            </div>
                        </div>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Фамилия</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={chageSurName}
                                    value={dataInt.lastName}
                                    placeholder={'Фамилия'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Образование</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={changeEducation}
                                    value={dataInt.education}
                                    placeholder={'Образование'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styleEdit.part}>Контакты</div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Почта</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={changeEmail}
                                    value={dataInt.email}
                                    placeholder={'Почта'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Номер</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={changeNumber}
                                    value={dataInt.number}
                                    placeholder={'Номер'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Город</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={changeCity}
                                    value={dataInt.city}
                                    placeholder={'Город'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${styleEdit.int} df`}>
                        <div className={styleEdit.block}>
                            <div className={styleEdit.field}>Страна</div>
                            <div className={styleEdit.input}>
                                <Input
                                    onChanges={changeCountry}
                                    value={dataInt.country}
                                    placeholder={'Страна'}
                                    type={'text'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <button onClick={toServer}>dfsfsdfvhusdfh</button> */}
        </div>
    );
};

export default Edit;
