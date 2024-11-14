import styles from '@/styles/componentsModules/slider/Slider.module.scss';
import Image, { StaticImageData } from 'next/image';
import { FC, useState } from 'react';

interface SliderProps {
    slides: { img: StaticImageData; name: string; link?: () => void }[];
}

const Slider: FC<SliderProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesPerSlide = 3;
    const totalSlides = Math.ceil(slides.length / imagesPerSlide);
    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalSlides);
    };
    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + totalSlides) % totalSlides);
    };
    const visibleImages = slides.slice(currentIndex * imagesPerSlide, (currentIndex + 1) * imagesPerSlide);

    return (
        <>
            <div className={`${styles.slider} dfca`}>
                <div className={`${styles.sliderContent} dfja`} style={{ width: '100%' }}>
                    {/* Показываем три изображения на каждом слайде */}
                    {visibleImages.map(({ img, name, link }, index) => (
                        <div key={index} className={styles.slide}>
                            <Image src={img} alt={`Slide ${currentIndex * imagesPerSlide + index}`} onClick={link} />
                            <p>{name}</p>
                        </div>
                    ))}
                </div>

                {/* Контролы слайдера */}
                <div className={styles.sliderControls}>
                    <button className={styles.prev} onClick={prevSlide}>
                        &lt;
                    </button>
                    <button className={styles.next} onClick={nextSlide}>
                        &gt;
                    </button>
                </div>
            </div>

            {/* Индикаторы слайдов */}
            <div className={styles.sliderIndex}>
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <span key={index} className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}></span>
                ))}
            </div>
        </>
    );
};

export default Slider;
