'use client';

import user from '@/app/store/user/user';
// styles
import styleEdit from '@/styles/PagesModules/profile/Edit.module.scss';
import { usersType } from '@/shared/types/User/User.types';

// UI
import Input from '@/shared/UI/Search/Search';
import axios from 'axios';

// modules
import { FC, useContext, useState } from 'react';
import Btn from '@/shared/UI/Button/Button';
import { observer } from 'mobx-react-lite';
import Modal from '@/shared/UI/Modal/Modal';

import Mark from '@/shared/image/gif/mark ok.gif';
import Image from 'next/image';

interface EditI {}
const Edit: FC<EditI> = observer(({}) => {
    const userD = user.userFullData;

    const [open, setOpen] = useState<boolean>(false);

    const [dataInt, setDataInt] = useState({
        name: userD?.name || '',
        education: userD?.education || '',
        lastName: userD?.lastName || '',
        email: userD?.email || '',
        city: userD?.city || '',
        number: userD?.number || '',
        country: userD?.country || '',
    });

    const saveOpen = (ms: number) => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, ms);
    };

    const searchChange = () => {
        let save: Partial<typeof dataInt> = {};
        Object.keys(dataInt).forEach(key => {
            if (dataInt[key as keyof typeof dataInt] !== userD?.[key as keyof typeof userD]) {
                save[key as keyof typeof dataInt] = dataInt[key as keyof typeof dataInt];
            }
        });

        if (Object.keys(save).length > 0) {
            toServer(save);
            save = {};
            saveOpen(1500);
        }
    };

    const handleInputChange = (key: string, e: string) => {
        setDataInt(prev => ({ ...prev, [key]: e.trim() }));
    };

    const toServer = async (update: any) => {
        try {
            fetch(`/api/user/${userD?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: update }),
            });
        } catch (err) {
            throw err;
        }
    };

    return (
        <>
            <Modal isOpen={open} visibleX={false}>
                <div className={`${styleEdit.save} dfc`}>
                    <div>
                        <div className='dfc'>
                            <Image src={Mark} alt='mark' />
                        </div>
                        <div className={styleEdit.thankText}>Сохранен!</div>
                    </div>
                </div>
            </Modal>

            <div className={styleEdit.edit}>
                <div className={`${styleEdit.content} df`}>
                    <div className={styleEdit.personal}>
                        <div className={styleEdit.cate}>Персональные</div>
                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Имя</div>
                            <div className='df' style={{ gap: 12 }}>
                                <Input
                                    type={'text'}
                                    placeholder={'Имя'}
                                    onChanges={(e: string) => handleInputChange('name', e)}
                                    value={dataInt.name}
                                />
                                <Input
                                    type={'text'}
                                    placeholder={'Фамилия'}
                                    onChanges={(e: string) => handleInputChange('lastName', e)}
                                    value={dataInt.lastName}
                                />
                            </div>
                        </div>

                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Образование</div>
                            <Input
                                type={'text'}
                                placeholder={'Образование'}
                                onChanges={(e: string) => handleInputChange('education', e)}
                                value={dataInt.education}
                            />
                        </div>
                    </div>

                    <div className={styleEdit.contact}>
                        <div className={styleEdit.cate}>Контактнные</div>
                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Почта</div>
                            <Input
                                type={'text'}
                                placeholder={'Почта'}
                                onChanges={(e: string) => handleInputChange('email', e)}
                                value={dataInt.email}
                            />
                        </div>

                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Номер</div>
                            <Input
                                type={'text'}
                                placeholder={'Номер'}
                                onChanges={(e: string) => handleInputChange('number', e)}
                                value={dataInt.number}
                            />
                        </div>

                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Страна</div>
                            <Input
                                type={'text'}
                                placeholder={'Страна'}
                                onChanges={(e: string) => handleInputChange('country', e)}
                                value={dataInt.country}
                            />
                        </div>
                        <div className={styleEdit.input}>
                            <div className={styleEdit.name}>Город</div>
                            <Input
                                type={'text'}
                                placeholder={'Город'}
                                onChanges={(e: string) => handleInputChange('city', e)}
                                value={dataInt.city}
                            />
                        </div>
                    </div>
                </div>
                <div className={styleEdit.btn}>
                    <Btn
                        style={{
                            background: 'transparent',
                            color: 'black',
                            border: 6,
                        }}
                        onClick={searchChange}
                    >
                        Сохранить
                    </Btn>
                </div>
            </div>
        </>
    );
});

export default Edit;
