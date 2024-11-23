import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface Styled {
    color: string;
    background: string;
    height: string;
    width: string;
    fonstS: number;
    margin: string;
}

interface InputStyledProps {
    styled?: Partial<Styled>;
}

const InputStyled = styled.input<InputStyledProps>`
    border: 0.5px solid #9f9f9f;
    background-color: ${props => props.styled?.background || 'transparent'};
    border-radius: 7px;
    height: ${props => (props.styled?.height ? props.height : '56px')};
    width: ${props => (props.styled?.width ? props.width : '100%')};
    color: ${props => props.styled?.color || '#000'};
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    font-size: ${props => (props.styled?.fonstS ? props.styled?.fonstS : '14px')};
    margin: ${props => (props.styled?.margin ? props.styled?.fonstS : '0 0 24px 0 ')};
`;

interface InputPrimeProps {
    value: string;
    onChange: (v: string) => void;
    holder: string;
    styled?: Partial<Styled>;
}

const InputPrime: FC<InputPrimeProps> = ({ value, onChange, holder, styled }) => {
    return (
        <InputStyled value={value} placeholder={holder} styled={styled} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
    );
};

export default InputPrime;
