import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface InputStyledProps {
    styled?: {
        color: string;
        background: string;
    };
}

const InputStyled = styled.input<InputStyledProps>`
    border: 0.5px solid #9f9f9f;
    background-color: ${props => props.styled?.background || 'transparent'};
    border-radius: 7px;
    height: 56px;
    width: 100%;
    color: ${props => props.styled?.color || '#000'};
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 24px;
`;

interface InputPrimeProps {
    value: string;
    onChange: (v: string) => void;
    holder: string;
    styled?: {
        color: string;
        background: string;
    };
}

const InputPrime: FC<InputPrimeProps> = ({ value, onChange, holder, styled }) => {
    return (
        <InputStyled value={value} placeholder={holder} styled={styled} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
    );
};

export default InputPrime;
