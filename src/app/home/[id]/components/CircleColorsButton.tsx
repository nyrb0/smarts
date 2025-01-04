import React from 'react';
import styled from 'styled-components';

interface CircleColorsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color: string;
}

const StyledCircleColorsButton = styled.div<CircleColorsType>`
    background: ${props => props.color};
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    &:hover {
        outline: 1.3px solid black;
    }
`;

const CircleColorsButton: React.FC<CircleColorsType> = ({ color, ...props }) => {
    return <StyledCircleColorsButton color={color} {...props}></StyledCircleColorsButton>;
};

export default CircleColorsButton;
