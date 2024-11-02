import Modal from '@/shared/UI/Modal/Modal';
import { FC } from 'react';
import styles from '@/styles/componentsModules/Shere/Shere.module.scss';

interface ShereSocialProps {
    isOpen: boolean;
    maxWidth?: number;
    theUrl: string;
    indexUp?: number;
    close: () => void;
}

const ShereSocial: FC<ShereSocialProps> = ({ isOpen = false, maxWidth = 500, theUrl = '', close, indexUp }) => {
    return (
        <Modal isOpen={isOpen} background='#EDEDED' maxWidth={maxWidth} close={close} IndexUp={indexUp}>
            Поделиться
        </Modal>
    );
};

export default ShereSocial;
