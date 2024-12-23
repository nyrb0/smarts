import styled from 'styled-components';

export const StyledSwiperPhotos = styled.div`
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledSlideContent = styled.div`
    position: relative;
    z-index: 1000;
    width: 100%;
`;

export const StyledX = styled.div`
    position: absolute;
    right: 15px;
    top: 10px;
    color: #fff;
    cursor: pointer;
`;

export const StyledImageSlide = styled.img`
    max-width: 500px;
    width: 100%;
    height: 80vh;
    object-fit: contain;
`;
