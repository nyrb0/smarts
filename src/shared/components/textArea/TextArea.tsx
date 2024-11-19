import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
    min-width: 100%;
    max-width: 100%;
    font-size: 13px;
    max-height: 300px;
    outline: none;
    color: #000;
`;

interface InputGrayProps {
    value: string;
    onChange: (v: string) => void;
    holder: string;
}

const TextArea: FC<InputGrayProps> = ({ holder, value, onChange }) => {
    return <StyledTextArea value={value} placeholder={holder} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} />;
};

export default TextArea;
