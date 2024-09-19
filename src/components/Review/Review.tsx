import styleReview from '@/styles/componentsModules/Review.module.scss';

const Review = () => {
    return (
        <div className={`${styleReview.review} container`}>
            <div className={styleReview.text}>Reviews</div>
            <div className={styleReview.allResults}>
                <div className={`${styleReview.block}   dfca`}>
                    <div className={styleReview.inner}>
                        <div className={styleReview.reviewNum}>4.8</div>
                        <div className={styleReview.lengthReview}>of 125 reviews</div>
                    </div>
                </div>
                <div className={styleReview.static}>fjbshb</div>
            </div>
        </div>
    );
};

export default Review;
