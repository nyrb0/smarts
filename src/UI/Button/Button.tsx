import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
interface ButtonI {
    children: ReactNode;
    style: { border: number; background: string };
}

const Button: FC<ButtonI> = ({ children, style }) => {
    return (
        <button
            style={{ borderRadius: style.border, background: style.background }}
            className={s.btn}
        >
            {children}
        </button>
    );
};

export default Button;
