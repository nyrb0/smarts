'use client';
import StRegis from '@/styles/PagesModules/Regist.module.scss';
import Input from '@/UI/Input/Input';
import { useState } from 'react';
import Image from 'next/image';
import imgRegis from '@/icons/RegisImg.jpg';
import twich from '@/icons/twitch.png';
import instagram from '@/icons/instagram.png';
import facebook from '@/icons/fb 1.png';

const Regis = () => {
    const [haveAcc, setHaveAcc] = useState(false);
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const [errName, setErrName] = useState('');
    const [errLastName, setErrLastName] = useState('');
    const [errPass, setErrPass] = useState('');

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
        setPassword2(v);
    };
    const sendDataServer = (e: any) => {
        e.preventDefault();

        if (!name.length) {
            setErrName('(пусто)');
        }
        if (name.length >= 30 || name.length <= 6) {
            setName('');
            setErrName(
                '**Длина строки должны быть не больше 30 и не меньше 6**'
            );
        }
        if (lastName.length >= 30 || lastName.length <= 6) {
            setErrLastName(
                '**Длина строки должны быть не больше 30 и не меньше 6**'
            );
            setLastName('');
        }

        if (password1 !== password2) {
            setErrPass('**Пароли не совпадают!!**');
            setPassword1('');
            setPassword2('');
        }
        if (password1.length < 6 || password1.length > 20) {
            setErrPass('Придумайте пароль от 5 до 20 символов');
            setPassword1('');
            setPassword2('');
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
                        <div>
                            Welcome to Smarts <br />
                            <span>Registration Here</span>
                        </div>
                        <form onSubmit={sendDataServer}>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Имя'}
                                    onChange={changeName}
                                    value={name}
                                />
                                <div className={StRegis.err}>{errName}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Фамилия'}
                                    onChange={changeLastName}
                                    value={lastName}
                                />
                                <div className={StRegis.err}>{errLastName}</div>
                            </div>
                            <div className={StRegis.input}>
                                <Input
                                    placeholder={'Пароль'}
                                    onChange={changePassWord1}
                                    value={password1}
                                />
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
                            <p
                                className={StRegis.have}
                                onClick={() => setHaveAcc(true)}
                            >
                                Have account?
                            </p>
                            <button type='submit' className={StRegis.btn}>
                                Registration
                            </button>
                        </form>
                        <div className={StRegis.withSocial}>
                            Registration With
                        </div>
                        <div className={StRegis.socials}>
                            {social.map((s, i) => (
                                <Image
                                    key={i}
                                    src={s}
                                    alt='соц. сети'
                                    className={StRegis.s}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Regis;
