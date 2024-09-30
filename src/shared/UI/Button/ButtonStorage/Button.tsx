'use client';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import st from './Button.module.scss';

const ButtonStyled = styled.button``;

interface ButtonI {
    children?: ReactNode;
    onClick?: () => void;
    border?: string;
}

const Button: FC<ButtonI> = ({ onClick, children, border }) => {
    return (
        <button onClick={onClick} className={st.button} style={{ border: border }}>
            {children}
        </button>
    );
};

export default Button;
