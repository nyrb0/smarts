import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
interface ButtonI {
    children: ReactNode;
    style: { border: number; background: string; color?: string; line?: string };
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonI> = ({ children, style, onClick, type = 'button' }) => {
    return (
        <button
            onClick={onClick}
            style={{
                borderRadius: style.border,
                background: style.background,
                color: style.color || 'white',
                border: style.line || '1px solid black',
            }}
            className={s.btn}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
