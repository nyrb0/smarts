import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface StyledTextAreaProps {
    styled?: {
        height: number;
    };
}

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
    min-width: 100%;
    max-width: 100%;
    font-size: 13px;
    max-height: 300px;
    height: ${props => `${props.styled?.height}px` || '100%'};
    outline: none;
    color: #000;
    box-sizing: border-box;
`;

interface TextAreaProps {
    value: string;
    onChange: (v: string) => void;
    holder: string;
    styled?: {
        height: number;
    };
}

const TextArea: FC<TextAreaProps> = ({ holder, value, onChange, styled }) => {
    return (
        <StyledTextArea
            value={value}
            placeholder={holder}
            styled={styled}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
    );
};

export default TextArea;
