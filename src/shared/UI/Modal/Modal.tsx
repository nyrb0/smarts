import { FC, ReactNode } from 'react';
import styleModal from './Modal.module.scss';
import { observer } from 'mobx-react-lite';

interface ModalI {
    isOpen: boolean;
    close?: () => void;
    children: ReactNode;
    visibleX?: boolean;
}

const Modal: FC<ModalI> = observer(({ isOpen, close, children, visibleX = true }) => {
    return (
        <>
            {isOpen && (
                <div className={styleModal.modal} onClick={close}>
                    <div className={styleModal.content}>
                        {visibleX && (
                            <div className={styleModal.close} onClick={close}>
                                X
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            )}
        </>
    );
});

export default Modal;
