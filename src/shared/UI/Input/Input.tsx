import { ChangeEvent, FC } from 'react';

import styled from 'styled-components';
interface InputI {
    placeholder: string;
    type?: string;
}

const InputStyled = styled.input`
    padding: 0 0 0 10px;
    box-sizing: border-box;
    background-color: transparent;
    border-bottom: 1.5px solid #7d7d7d;
    color: #b0b0b0;
    font-family: var(--poppinsFont), sans-serif;
    font-weight: 700;
    font-size: 20px;
    width: 300px;
    &::placeholder {
        color: #b0b0b0;
    }
`;

const Input: FC<InputI> = ({ placeholder, type = 'text', ...props }) => {
    return <InputStyled type={type} placeholder={placeholder} {...props} />;
};

export default Input;
