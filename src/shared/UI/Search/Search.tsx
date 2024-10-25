'use client';
import { FC, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface SearchI {
    value: string;
    onChanges: (v: string) => void;
    placeholder: string;
    type?: 'search' | 'text';
    onKeyDown?: (v: string) => void;
    onFocus?: (v: boolean) => void;
}

const StyledInput = styled.input`
    width: 100%;
    background: #f5f5f5;
    padding: 0 6px;
    height: 44px;
    border-radius: 8px;
    &::placeholder {
        color: #b0b0b0;
    }
`;

const Search: FC<SearchI> = ({ value, onChanges, placeholder, type = 'search', onKeyDown, onFocus }) => {
    return (
        <StyledInput
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChanges(e.target.value)}
            placeholder={placeholder}
            onFocus={() => onFocus?.(true)}
            onBlur={() => onFocus?.(false)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown?.(e.key)}
        />
    );
};

export default Search;
