import Modal from '@/shared/UI/Modal/Modal';
import { FC, useState } from 'react';
import styles from '@/styles/componentsModules/Shere/Share.module.scss';
import LinkCopyInput from '../Order/components/Input/InputOrder';
import Slider from '../Slider/Slider';

// social image
import instagramImage from '@/app/assets/img/social_image/instagram.png';
import telegramImage from '@/app/assets/img/social_image/telegram.png';
import whatsapp from '@/app/assets/img/social_image/whatsapp.png';
import { StaticImageData } from 'next/image';

interface ShereSocialProps {
    isOpen: boolean;
    maxWidth?: number;
    theUrl: string;
    indexUp?: number;
    close: () => void;
    textShare: string;
}

type arrSlides = {
    img: StaticImageData;
    name: string;
    link: () => void;
};

const ShereSocial: FC<ShereSocialProps> = ({ isOpen = false, maxWidth = 500, textShare, theUrl = '', close, indexUp }) => {
    const [copied, setCopied] = useState(false);
    const handleCope = async (timeOut: number) => {
        try {
            await navigator.clipboard.writeText(theUrl);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, timeOut);
        } catch (err) {
            console.log('Ошибка при копировании:', err);
        }
    };

    const arrSlides: StaticImageData[] = [instagramImage, telegramImage, whatsapp];

    const arrSlides2: arrSlides[] = [
        {
            name: 'Инстаграм',
            img: instagramImage,
            link: () => {
                const url = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(textShare)}%20${encodeURIComponent(theUrl)}`;
                open(url, '_black');
            },
        },
        {
            name: 'Телеграмм',
            img: telegramImage,
            link: () => {
                const url = `https://t.me/share/url?url=${encodeURIComponent(textShare)}&text=${encodeURIComponent(theUrl)}`;
                open(url, '_black');
            },
        },
        {
            name: 'Whatsapp',
            img: whatsapp,
            link: () => {
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textShare)} ${encodeURIComponent(theUrl)}`;
                open(url, '_black');
            },
        },
    ];

    return (
        <Modal isOpen={isOpen} background='#EDEDED' maxWidth={maxWidth} close={close} IndexUp={indexUp}>
            <div className={styles.share}>
                <h2>Поделиться</h2>
                <div className={styles.slider}>
                    <Slider slides={arrSlides2} />
                </div>
                <LinkCopyInput
                    isVisibleButton
                    value={theUrl}
                    btnText={`${copied ? 'Ссылка скопирована' : 'Копировать ссылку'}`}
                    onChange={() => null}
                    onClick={() => handleCope(2000)}
                    colorBtn={'#3ea6ff'}
                />
            </div>
        </Modal>
    );
};

export default ShereSocial;
