import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
    border: 0.5px solid #9f9f9f;
    border-radius: 7px;
    height: 56px;
    width: 100%;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 24px;
`;

interface InputGrayProps {
    value: string;
    onChange: (v: string) => void;
    holder: string;
}

const InputGray: FC<InputGrayProps> = ({ value, onChange, holder }) => {
    return <InputStyled value={value} placeholder={holder} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />;
};

export default InputGray;
