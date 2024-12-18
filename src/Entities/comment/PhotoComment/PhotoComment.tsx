import { FC } from 'react';
import styled from 'styled-components';
import { DeleteImageCommentStyled, ImageCommentStyled, TextPhotoStyled, WrapperCommentStyled } from './PhotoComment.styled';

interface PhotoCommentProps {
    data: string;
    alt: string;
    deleteClick?: () => void;
    isVisibleClose?: boolean;
    isThisPhoto?: boolean;
}

const PhotoComment: FC<PhotoCommentProps> = ({ data, alt, deleteClick, isVisibleClose = true, isThisPhoto = true }) => {
    return (
        <div>
            <WrapperCommentStyled>
                <ImageCommentStyled src={data} alt={alt} />
                {isVisibleClose && <DeleteImageCommentStyled onClick={deleteClick}>X</DeleteImageCommentStyled>}
                {isThisPhoto && <TextPhotoStyled className='dfa'>это фото?</TextPhotoStyled>}
            </WrapperCommentStyled>
        </div>
    );
};

export default PhotoComment;
