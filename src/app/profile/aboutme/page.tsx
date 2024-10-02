'use client';
import user from '@/app/store/user/user';
import { observer } from 'mobx-react-lite';

import styleAbout from '@/styles/PagesModules/profile/AboutMe.module.scss';

const AboutMe = () => {
    return (
        <div className={styleAbout.about}>
            <div className={styleAbout.aboutMe}>Обо мне</div>
            <div className={styleAbout.name}>
                Имя: <span className={styleAbout.center}>{user.userFullData?.name}</span>
            </div>
            <div>
                Фамилия: <span className={styleAbout.center}>{user.userFullData?.lastName}</span>
            </div>
            <div>
                Образование: <span className={styleAbout.center}>{user.userFullData?.education}</span>
            </div>

            <div className={styleAbout.location}>
                <div className={styleAbout.locationAbout}>Локация</div>
                <div>
                    Город: <span className={styleAbout.center}>{user.userFullData?.city}</span>
                </div>
                <div>
                    Страна: <span className={styleAbout.center}>{user.userFullData?.country}</span>
                </div>
            </div>

            <div className={styleAbout.contact}>
                <div>Контакты </div>
                <div>
                    Номер: <span className={styleAbout.center}>{user.userFullData?.number}</span>
                </div>
                <div>
                    Почта: <span className={styleAbout.center}>{user.userFullData?.email}</span>
                </div>
            </div>
        </div>
    );
};

export default observer(AboutMe);
