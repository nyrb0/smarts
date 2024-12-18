import { FC, memo, useCallback, useState } from 'react';
import styles from '@/styles/PagesModules/channel/AddSocial.module.scss';
import InputPrime from '@/shared/UI/Input/InputPrime/InputPrime';
import Image, { StaticImageData } from 'next/image';

//  image
import instagramImage from '@/app/assets/img/social_image/instagram.png';
import telegramImage from '@/app/assets/img/social_image/telegram.png';
import vkImage from '@/app/assets/img/social_image/vk.png';
import whatsapp from '@/app/assets/img/social_image/whatsapp.png';
import { observer } from 'mobx-react-lite';
import channelStore from '@/app/store/channel/channelStore';
import Btn from '@/shared/UI/Button/Button';
import { motion } from 'framer-motion';
import user from '@/app/store/user/user';
import { SocialType } from '@/shared/types/channel/Channel.types';

interface addSocical {
    data: { id: string; social: SocialType };
}

const AddSocial: FC<addSocical> = observer(({ data }) => {
    const [links, setLinks] = useState({
        tg: data.social.tg,
        vk: data.social.vk,
        tt: data.social.tt,
        ins: data.social.ins,
        offical: data.social.offical,
    });
    const [isEdit, setIsEdit] = useState(false);
    const { userFullData } = user;
    const [count, setCount] = useState(0);

    const handleToServer = () => {
        console.log('i work', data.id);
        channelStore.editSave(data.id, { social: links });
    };
    const handleCounter = () => {
        if (count === 2) return;
        setCount(prev => prev + 1);
    };
    const BlockSocialComponent = ({ name, image, field }: { name: string; image: StaticImageData; field: keyof typeof links }) => {
        const changeLinks = (e: string) => {
            setIsEdit(true);
            setLinks(prev => ({ ...prev, [field]: e }));
        };
        return (
            <div className={`${styles.social} dfa`}>
                <Image src={image} alt='social' width={50} height={50} />
                <InputPrime value={links[field]} styled={{ height: '10px', fonstS: 11, margin: '0 0 0 0' }} holder={name} onChange={changeLinks} />
            </div>
        );
    };

    const componentsSocial = [
        <BlockSocialComponent name='Инстаграмм' field={'ins'} image={instagramImage} key={1} />,
        <BlockSocialComponent name='Телеграмм' field={'tg'} image={telegramImage} key={2} />,
        <BlockSocialComponent name='Вконтакте' field={'vk'} image={vkImage} key={3} />,
    ];

    return (
        <div className={`${styles.socials} `}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {count >= 0 ? componentsSocial[0] : null}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {count >= 1 ? componentsSocial[1] : null}
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                {count >= 2 ? componentsSocial[2] : null}
            </motion.div>
            <div className={`${styles.btnPlus} dfc`}>
                <span>
                    <Btn
                        onClick={handleCounter}
                        style={{
                            background: '#000',
                            color: '#fff',
                            border: 5,
                        }}
                    >
                        +
                    </Btn>
                </span>
            </div>
            <div className={`${styles.btnSave} dfc`}>
                <span>
                    <Btn
                        onClick={handleToServer}
                        style={{
                            background: '#000',
                            color: '#fff',
                            border: 5,
                            opacity: !isEdit ? 0.6 : 1,
                        }}
                        disabled={!isEdit}
                    >
                        Сохранить
                    </Btn>
                </span>
            </div>
        </div>
    );
});
export default AddSocial;
