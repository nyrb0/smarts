'use client';
import StRegis from '@/styles/PagesModules/Regist.module.scss';
import Input from '@/UI/Input/Input';
import { useState } from 'react';
import stylesRegis from '@/styles/PagesModules/Regist.module.scss';
import Image from 'next/image';
import imgRegis from '@/icons/RegisImg.jpg';

const Regis = () => {
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const changeName = (v: string) => {
        setName(v);
    };
    const changeLastName = (v: string) => {
        setLastName(v);
    };
    const changePassWord1 = (v: string) => {
        setPassword1(v);
    };
    const changePassWord2 = (v: string) => {
        setPassword1(v);
    };

    return (
        <div className={StRegis.reg}>
            <div className={`${StRegis.container} df`}>
                <div className={StRegis.left}>
                    <Image width={250} src={imgRegis} alt='телефон' />
                </div>
                <div className={StRegis.right}>
                    <form>
                        <div className={StRegis.input}>
                            <Input
                                placeholder={'Имя'}
                                onChange={changeName}
                                value={name}
                            />
                        </div>
                        <div className={StRegis.input}>
                            <Input
                                placeholder={'Фамилия'}
                                onChange={changeLastName}
                                value={lastName}
                            />
                        </div>
                        <div className={StRegis.input}>
                            <Input
                                placeholder={'Пароль'}
                                onChange={changePassWord1}
                                value={password1}
                            />
                        </div>
                        <div className={StRegis.input}>
                            <Input
                                placeholder={'Повторите пароль'}
                                onChange={changePassWord2}
                                value={password2}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Regis;
