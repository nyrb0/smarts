'use client ';
import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface SearchI {
    value: string;
    onChanges: (v: string) => void;
    placeholder: string;
}

const StyledComponents = styled.input`
    width: 100%;
    background: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    &::placeholder {
        color: #b0b0b0;
    }
`;

const Search: FC<SearchI> = ({ value, onChanges, placeholder }) => {
    const changes = (v: string) => {
        onChanges(v);
    };
    return (
        <StyledComponents
            type='search'
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => changes(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default Search;
