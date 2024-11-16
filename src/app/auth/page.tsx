'use client';

// styles
import StRegis from '@/styles/PagesModules/Regist.module.scss';
// components
import Input from '@/shared/UI/Input/Input';
// modules
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
// icons
import imgRegis from '@/shared/icons/RegisImg.jpg';
import twich from '@/shared/icons/twitch.png';
import instagram from '@/shared/icons/instagram.png';
import facebook from '@/shared/icons/fb 1.png';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
    const isAuthUser = Cookies.get('userData1');

    useEffect(() => {
        if (isAuthUser) {
            router.push('/');
        }
    }, [isAuthUser]);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    // Validation for password confirmation
    const validatePassword = (value: string) => {
        if (watch('password') !== value) {
            return 'Пароли не совпадают';
        }
        return true;
    };

    const [haveAcc, setHaveAcc] = useState(false);

    const signInAndRegis = (isHave: boolean) => {
        setHaveAcc(isHave);
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log('Form Data:', data);
        reset();
    };
    console.log(watch());

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
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
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

// const toSendServerData = async () => {
//     const userData = {
//         name,
//         userName,
//         lastName,
//         password: password1,
//     };

//     try {
//         const data = await fetch('/api/user', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(userData),
//         });
//         if (data.ok) {
//             clearAllValueData();
//             router.push('/home');
//             Cookies.set('userData1', userData.userName);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };

// const getUsersData = async (e: any) => {
//     e.preventDefault();
//     if (!userName.length && !password1.length) return;
//     try {
//         const res = await fetch('/api/user', {
//             method: 'GET',
//         });
//         if (!res.ok) {
//             throw new Error('Error fetching data');
//         }
//         const data: usersType[] = await res.json();
//         const userFind = data.find(use => use.userName === userName);
//         if (userFind && password1 === userFind.password) {
//             console.log('Вход выполнен');
//             Cookies.set('userData1', userFind.userName);
//             router.push('/home');
//         } else {
//             console.log('Нету такого пользователя');
//             setErrPass('Нету такого пользователя');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// };
export default Regis;
