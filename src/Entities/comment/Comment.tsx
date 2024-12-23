// style
import commentS from '@/styles/componentsModules/Comment.module.scss';

// types
import { Comments, Photos } from '@/shared/types/Phones/TypePhone.types';

// UI
import { Rating } from '@mui/material';

// modules
import Image from 'next/image';
import { FC } from 'react';

//img
import profilePhoto from '@/shared//image/me.jpg';
import { MdDelete } from 'react-icons/md';

// func
import { months } from '@/Features/month';
import PhotoComment from './PhotoComment/PhotoComment';

interface CommentI {
    com: Comments;
    deleteCom: (c: string) => void;
    userCommnent: string | undefined;
    onClick: (s: Photos[]) => void;
    onChangePhotos: (index: number) => void;
}

const Comment: FC<CommentI> = ({ com, deleteCom, userCommnent, onClick, onChangePhotos }) => {
    const deleteComment = (c: string) => {
        console.log(c);
        deleteCom(c);
    };
    return (
        <div className={`${commentS.comment} df`}>
            <div className={commentS.left}>
                <div className={commentS.photo}>
                    <Image src={profilePhoto} alt='profile photo' />
                </div>
            </div>
            <div className={commentS.right}>
                <div className={`${commentS.head} dfj`}>
                    <div className={commentS.userName}>{com.user || 'user'}</div>
                    <div className={commentS.date}>
                        {com.date && `${com.date?.day} ${months(com.date?.month)}, ${com.date?.year}, ${com.date.hours}:${com.date.minutes}`}
                    </div>
                </div>
                <div className={commentS.rating}>
                    <Rating name='read-only' value={com.votesStars} readOnly />
                </div>
                <div className={commentS.theComment}>{com.comment}</div>
                <div className={`${commentS.delete} ${com.user === userCommnent ? null : commentS.userDel}`}>
                    <MdDelete style={{ opacity: 0.4 }} onClick={() => deleteComment(com.id)} />
                </div>
                <div className={`${commentS.photos} df`}>
                    {com.photos?.map((photo, i) => (
                        <div
                            key={photo.id}
                            onClick={() => {
                                if (com.photos) {
                                    onClick(com.photos);
                                }
                                onChangePhotos(i);
                            }}
                        >
                            <PhotoComment isThisPhoto={false} isVisibleClose={false} data={photo.img} alt={'фото коммента'} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Comment;
