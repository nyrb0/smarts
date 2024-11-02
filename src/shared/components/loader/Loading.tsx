import React from 'react';
import styled from 'styled-components';

const LoadinStyled = styled.div`
    /* D6D6D6 */
    display: flex;
    align-items: center;
    border: 8px solid rgba(255, 255, 255, 0);
    border-radius: 50%;
    border-top: 8px solid red;
    width: 70px;
    height: 70px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    @media screen and (max-width: 633px) {
        border: 4px solid rgba(255, 255, 255, 0);
        width: 50px;
        height: 50px;
        border-top: 4px solid red;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loading = () => {
    return <LoadinStyled />;
};

export default Loading;
