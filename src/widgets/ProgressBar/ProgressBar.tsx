import { FC } from 'react';
import styled from 'styled-components';

interface ProgressBarI {
    progress: number;
    // max: number;
    color?: string;
}

const Container = styled.div`
    width: 100%;
    height: 5px;
    background-color: #e0e0e0;
    border-radius: 16px;
    overflow: hidden;
`;

// Сама полоска прогресса
const Filler = styled.div<ProgressBarI>`
    height: 100%;
    width: ${props => props.progress}%;
    background-color: ${props => props.color || '#76c7c0'};
    border-radius: 16px 0 0 16px;
    transition: width 0.3s ease-in-out;
`;

const ProgressBar: FC<ProgressBarI> = ({ color, progress }) => {
    return (
        <Container>
            <Filler color={color} progress={progress} />
        </Container>
    );
};

export default ProgressBar;
