'use client';
import StRegis from '@/styles/PagesModules/Regist.module.scss';
import Input from '@/UI/Input/Input';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import imgRegis from '@/icons/RegisImg.jpg';
import twich from '@/icons/twitch.png';
import instagram from '@/icons/instagram.png';
import facebook from '@/icons/fb 1.png';
import Cookies from 'js-cookie';
import { usersType } from '@/types/User/User.types';
import user from '../store/user/user';
import { useRouter } from 'next/navigation';
import { isValidUsername } from '../constant/isValid';

const Regis = () => {
    const router = useRouter();
    const isAuthUser = Cookies.get('userData1');
    if (isAuthUser) {
        router.push('/page');
        return;
    }
    const [users, setUsers] = useState<usersType[]>([]);

    // Validation
    const [haveAcc, setHaveAcc] = useState(false);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [userName, setUserName] = useState('');

    // Error states
    const [errName, setErrName] = useState('');
    const [errLastName, setErrLastName] = useState('');
    const [errPass, setErrPass] = useState('');
    const [errUserName, setErrUserName] = useState('');

    // Регистрация
    const changeName = (v: string) => {
        setName(v.toLocaleLowerCase());
    };
    const changeLastName = (v: string) => {
        setLastName(v.toLocaleLowerCase());
    };
    const changePassWord1 = (v: string) => {
        setPassword1(v.toLocaleLowerCase());
    };
    const changePassWord2 = (v: string) => {
        setPassword2(v.toLocaleLowerCase());
    };
    const changeUserName = (v: string) => {
        setUserName(v.toLocaleLowerCase());
    };
    const clearAllValueData = () => {
        setPassword1('');
        setPassword2('');
        setLastName('');
        setName('');
        setUserName('');
    };
    const signInAndRegis = (isHave: boolean) => {
        clearAllValueData();
        setHaveAcc(isHave);
    };

    // Запросы на бэк
    const toSendServerData = async () => {
        const userData = {
            name,
            userName,
            lastName,
            password: password1,
        };
        try {
            const data = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            if (data.ok) {
                clearAllValueData();
                router.push('/home');
                Cookies.set('userData1', userData.name);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getUsersData = async (e: any) => {
        e.preventDefault();
        if (!userName.length && !password1.length) return;
        try {
            const res = await fetch('/api/user', {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Error fetching data');
            }
            const data: usersType[] = await res.json();
            const userFind = data.find(use => use.userName === userName);
            if (userFind && password1 === userFind.password) {
                console.log('Вход выполнен');
                Cookies.set('userData1', userFind.userName);
                router.push('/');
            } else {
                console.log('Нету такого пользователя');
                setErrPass('Нету такого пользователя');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const sendDataServer = (e: any) => {
        e.preventDefault();
        if (!name.length) {
            setErrName('(пусто)');
            return;
        } else {
            setErrName('');
        }
        if (name.length >= 30) {
            setName('');
            setErrName('**Длина строки должны быть не больше 30**');
            return;
        } else {
            setErrName('');
        }
        if (lastName.length >= 30) {
            setErrLastName('**Длина строки должны быть не больше 30**');
            setLastName('');
            return;
        } else {
            setErrLastName('');
        }
        if (!isValidUsername(userName)) {
            setErrUserName('Как минимум символ должен содержать один символ');
            return;
        } else if (!userName.length) {
            setErrUserName('пусто');
            return;
        } else {
            setErrUserName('');
        }

        if (password1 !== password2) {
            setErrPass('**Пароли не совпадают!!**');
            setPassword1('');
            setPassword2('');
            return;
        }
        if (password1.length < 6 || password1.length > 20) {
            setErrPass('Придумайте пароль от 5 до 20 символов');
            setPassword1('');
            setPassword2('');
            return;
        } else {
            setErrPass('');
        }
        toSendServerData();
    };

    const sendSingIn = (e: any) => {
        e.preventDefault();
        setPassword1('');
        setPassword1(e.target.value);
    };

    const social = [twich, instagram, facebook];
    return (
        <div className={StRegis.reg}>
            <div className={`${StRegis.container} df`}>
                <div className={StRegis.left}>
                    <Image width={250} src={imgRegis} alt='телефон' />
                </div>
                {!haveAcc ? (
                    <div className={StRegis.right}>
                        <div className={StRegis.welcome}>
                            Welcome to Smarts <br />
                            <span>Registration Here</span>
                        </div>
                        <form onSubmit={sendDataServer}>
                            <div className={StRegis.input}>
                                <Input placeholder={'Имя'} onChange={changeName} value={name} />
                                <div className={StRegis.err}>{errName}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'**Фамилия**'}
                                    onChange={changeLastName}
                                    value={lastName}
                                />
                                <div className={StRegis.err}>{errLastName}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Имя пользователя'}
                                    onChange={changeUserName}
                                    value={userName}
                                />
                                <div className={StRegis.err}>{errUserName}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input placeholder={'Пароль'} onChange={changePassWord1} value={password1} />
                                <div className={StRegis.err}>{errPass}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Повторите пароль'}
                                    onChange={changePassWord2}
                                    value={password2}
                                />
                                <div className={StRegis.err}>{errPass}</div>
                            </div>
                            <p className={StRegis.have} onClick={() => signInAndRegis(true)}>
                                Have account?
                            </p>
                            <button type='submit' className={StRegis.btn}>
                                Registration
                            </button>
                        </form>
                        <div className={StRegis.withSocial}>Registration With</div>
                        <div className={StRegis.socials}>
                            {social.map((s, i) => (
                                <Image key={i} src={s} alt='соц. сети' className={StRegis.s} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={StRegis.right}>
                        <div className={StRegis.welcome}>
                            Welcome to Smarts <br />
                            <span>Sign in Here</span>
                        </div>
                        <form onSubmit={getUsersData}>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Имя пользователя'}
                                    onChange={changeUserName}
                                    value={userName}
                                />
                                <div className={StRegis.err}>{errPass}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input placeholder={'Пароль'} onChange={changePassWord1} value={password1} />
                                <div className={StRegis.err}>{errPass}</div>
                            </div>
                            <p className={StRegis.have} onClick={() => signInAndRegis(false)}>
                                Not have account?
                            </p>
                            <button type='submit' className={StRegis.btn}>
                                Sign in
                            </button>
                        </form>
                        <div className={StRegis.withSocial}>Sign in with</div>
                        <div className={StRegis.socials}>
                            {social.map((s, i) => (
                                <Image key={i} src={s} alt='соц. сети' className={StRegis.s} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Regis;
