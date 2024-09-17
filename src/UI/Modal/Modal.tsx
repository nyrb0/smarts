import { FC, ReactNode } from 'react';
import styleModal from './Modal.module.scss';
import { observer } from 'mobx-react-lite';

interface ModalI {
    isOpen: boolean;
    close?: () => void;
    children: ReactNode;
}

const Modal: FC<ModalI> = observer(({ isOpen, close, children }) => {
    return (
        <>
            {isOpen && (
                <div
                    className={styleModal.modal}
                    // onClick={(e: any) => {
                    //     e.stopPropagation();
                    //     close();
                    // }}
                >
                    <div className={styleModal.content}>
                        <div className={styleModal.close} onClick={close}>
                            X
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
});

export default Modal;
