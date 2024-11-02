import styled from 'styled-components';

export const StyledChannel = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    & img {
        object-fit: cover;
        border-radius: 50%;
    }
    &:hover {
        background-color: gray;
        border-radius: 3px;
    }
    padding: 4px;
`;
export const StyledChannelName = styled.p`
    font-size: 14px;
    color: #000;
`;
