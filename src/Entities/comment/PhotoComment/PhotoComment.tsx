import { FC } from 'react';
import styled from 'styled-components';
import { DeleteImageCommentStyled, ImageCommentStyled, TextPhotoStyled, WrapperCommentStyled } from './PhotoComment.styled';

interface PhotoCommentProps {
    data: string;
    alt: string;
    deleteClick: () => void;
}

const PhotoComment: FC<PhotoCommentProps> = ({ data, alt, deleteClick }) => {
    return (
        <div>
            <WrapperCommentStyled>
                <ImageCommentStyled src={data} alt={alt} />
                <DeleteImageCommentStyled onClick={deleteClick}>X</DeleteImageCommentStyled>
                <TextPhotoStyled className='dfa'>это фото?</TextPhotoStyled>
            </WrapperCommentStyled>
        </div>
    );
};

export default PhotoComment;
