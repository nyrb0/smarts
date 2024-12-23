import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StyledImageSlide, StyledSlideContent, StyledSwiperPhotos, StyledX } from './SwiperSlidePhotos.styled';
// Импорт CSS
import 'swiper/css';
import 'swiper/css/navigation';
import { FC } from 'react';
import { Photos } from '@/shared/types/Phones/TypePhone.types';

interface SwiperPhotosProps {
    data: Photos[];
    onClick?: () => void;
    initialSlide: number;
}

const SwiperPhotos: FC<SwiperPhotosProps> = ({ data, onClick, initialSlide }) => {
    return (
        <StyledSwiperPhotos>
            <StyledX onClick={onClick}>X</StyledX>
            <Swiper modules={[Navigation]} navigation={true} spaceBetween={30} slidesPerView={1} initialSlide={initialSlide}>
                {data.map(photo => (
                    <SwiperSlide key={photo.id}>
                        <div className='dfc'>
                            <StyledImageSlide src={photo.img} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </StyledSwiperPhotos>
    );
};

export default SwiperPhotos;
