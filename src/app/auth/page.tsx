'use client';

// styles
import StRegis from '@/styles/PagesModules/Regist.module.scss';
// components
import Input from '@/shared/UI/Input/Input';
// modules
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// icons
import imgRegis from '@/shared/icons/RegisImg.jpg';
import twich from '@/shared/icons/twitch.png';
import instagram from '@/shared/icons/instagram.png';
import facebook from '@/shared/icons/fb 1.png';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usersType } from '@/shared/types/User/User.types';

type Inputs = {
    name?: string;
    userName: string;
    lastName?: string;
    password1: string;
    password2: string;
    password: string;
    confirmPassword?: string;
    test: string;
};
const Regis = () => {
    const router = useRouter();
    const isAuthUser = localStorage.getItem('userData1');
    useEffect(() => {
        if (isAuthUser) {
            router.push('/');
        }
    }, [isAuthUser]);

    const {
        setError,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    const [haveAcc, setHaveAcc] = useState(false);

    const signInAndRegis = (isHave: boolean) => {
        setHaveAcc(isHave);
    };

    const validatePassword = (p1: string, p2: string) => {
        if (p1 === p2) return true;
        return false;
    };
    const getUsersData: SubmitHandler<Inputs> = async data => {
        try {
            const res = await fetch('/api/user', {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Error fetching data');
            }
            const dataFromServer: usersType[] = await res.json();
            const userFind = dataFromServer.find(use => use.userName === data.userName);
            if (userFind && validatePassword(watch().userName, userFind.userName)) {
                console.log('Вход выполнен');
                localStorage.setItem('userData1', userFind.userName);
                router.push('/home');
            } else {
                console.log('Нету такого пользователя');
                setError('password1', {
                    message: 'Нету такого пользователя',
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const toSendServerData: SubmitHandler<Inputs> = async data => {
        const { name, userName, lastName, password: password1 } = data;
        const dataUser = { name, userName, lastName, password1 };
        try {
            const data = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataUser),
            });
            if (data.ok) {
                router.push('/home');
                localStorage.setItem('userData1', dataUser.userName);
                reset();
            }
        } catch (err) {
            console.log(err);
        }
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
                        <form onSubmit={handleSubmit(toSendServerData)}>
                            <div className={StRegis.input}>
                                <Controller
                                    name='name'
                                    control={control}
                                    rules={{ required: 'Имя пользователя обязательно' }}
                                    render={({ field }) => <Input {...field} placeholder={'Имя'} />}
                                />
                                {errors.name && <div className={StRegis.err}>{errors.name.message}</div>}
                            </div>
                            <div className={StRegis.input}>
                                <Controller
                                    control={control}
                                    name='lastName'
                                    rules={{ minLength: { value: 2, message: 'Минимальная строка 2' } }}
                                    render={({ field }) => <Input placeholder={'Фамилия'} {...field} />}
                                />
                                {errors.lastName && <div className={StRegis.err}>{errors.lastName.message}</div>}
                            </div>
                            <div className={StRegis.input}>
                                <Controller
                                    name='userName'
                                    control={control}
                                    rules={{
                                        required: '@username обязательное',
                                        minLength: { value: 5, message: 'Минимальная строка 5' },
                                    }}
                                    render={({ field }) => <Input placeholder={'Имя пользователя'} {...field} />}
                                />
                                {errors.userName && <div className={StRegis.err}>{errors.userName.message}</div>}
                            </div>
                            <div className={StRegis.input}>
                                <Controller
                                    control={control}
                                    name='password1'
                                    rules={{ required: 'Пароль обязательный', minLength: { value: 6, message: 'Минимум 6 символов' } }}
                                    render={({ field }) => <Input placeholder={'Пароль'} {...field} type='password' />}
                                />
                                {errors.password && <div className={StRegis.err}>{errors.password.message}</div>}
                            </div>
                            <div className={StRegis.input}>
                                <Controller
                                    control={control}
                                    name='password2'
                                    rules={{ required: 'Пароль обязательный', minLength: { value: 6, message: 'Минимум 6 символов' } }}
                                    render={({ field }) => <Input placeholder={'Пароль'} {...field} type='password' />}
                                />
                                {errors.confirmPassword && <div className={StRegis.err}>{errors.confirmPassword.message}</div>}
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
                        <form onSubmit={handleSubmit(getUsersData)}>
                            <div className={StRegis.input}>
                                <Controller
                                    name='userName'
                                    control={control}
                                    rules={{
                                        required: '@username обязательное',
                                        minLength: { value: 5, message: 'Минимальная строка 5' },
                                    }}
                                    render={({ field }) => <Input placeholder={'Имя пользователя'} {...field} />}
                                />
                                {errors.userName && <div className={StRegis.err}>{errors.userName.message}</div>}
                            </div>
                            <div className={StRegis.input}>
                                <Controller
                                    control={control}
                                    name='password1'
                                    rules={{ required: 'Пароль обязательный', minLength: { value: 6, message: 'Минимум 6 символов' } }}
                                    render={({ field }) => <Input placeholder={'Пароль'} {...field} type='password' />}
                                />
                                {errors.password1 && <div className={StRegis.err}>{errors.password1?.message}</div>}
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
