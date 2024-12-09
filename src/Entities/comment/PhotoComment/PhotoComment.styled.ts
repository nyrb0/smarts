import styled from 'styled-components';

export const ImageCommentStyled = styled.img`
    border-radius: 5px;
    object-fit: cover;
    width: 100px;
    height: 100px;

    transition: filter 0.3s ease;

    &:hover {
        filter: blur(0.6px);
    }
`;

export const WrapperCommentStyled = styled.div`
    position: relative;
    transform: scale(0.95);
    transition: transform 0.3s ease-in;
    &:hover {
        transform: scale(1);
    }
`;

export const DeleteImageCommentStyled = styled.button`
    color: red;
    position: absolute;
    right: 0;
    top: 0;
`;

export const TextPhotoStyled = styled.p`
    color: red;
    font-weight: 600;
    font-size: 11px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translateY(50%);
    transform: translateX(50%);
    white-space: nowrap;
    visibility: hidden;
    ${WrapperCommentStyled}:hover & {
        visibility: visible;
    }
`;
