import { FC, ReactNode, useEffect, useRef } from 'react';
import styleModal from './Modal.module.scss';
import { observer } from 'mobx-react-lite';

interface ModalI {
    isOpen: boolean;
    close?: () => void;
    children: ReactNode;
    visibleX?: boolean;
    maxWidth?: number;
    background?: string;
    IndexUp?: number;
}

const Modal: FC<ModalI> = observer(({ isOpen, close, children, visibleX = true, maxWidth = 500, background = '#fff', IndexUp = 0 }) => {
    const modalREf = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen && modalREf.current) {
            modalREf.current.focus();
        }
    }, [isOpen]);
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target && close) {
            close();
        }
    };

    const keyEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen && close) {
            close();
        }
    };

    useEffect(() => {
        if (isOpen) {
            addEventListener('keydown', keyEscape);
        } else {
            removeEventListener('keydown', keyEscape);
        }
        return () => removeEventListener('keydown', keyEscape);
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    className={styleModal.modal}
                    onClick={handleModalClick}
                    style={{ zIndex: 999 + IndexUp }}
                    ref={modalREf}
                    tabIndex={-1}
                    aria-modal='true'
                    role='dialog'
                >
                    <div className={styleModal.content} style={{ maxWidth, background, zIndex: 1000 + IndexUp }}>
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
