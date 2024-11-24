import { FC, ReactNode } from 'react';
import s from './Button.module.scss';
interface ButtonI {
    children: ReactNode;
    style: Partial<{ border: number; background: string; color: string; line: string; opacity: number }>;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: FC<ButtonI> = ({ children, style, onClick, type = 'button', disabled = false }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{
                borderRadius: style.border,
                background: style.background,
                color: style.color || 'white',
                border: style.line || '1px solid black',
                opacity: style.opacity || 1,
            }}
            className={s.btn}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
