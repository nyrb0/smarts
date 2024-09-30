import styleReview from '@/styles/componentsModules/Review.module.scss';
import ProgressBar from '../../widgets/ProgressBar/ProgressBar';
import { ReviewCount } from '@/shared/types/Phones/TypePhone.types';
import { FC } from 'react';

interface ReviewI {
    dataAboutRev?: ReviewCount[];
}

const Review: FC<ReviewI> = ({ dataAboutRev }) => {
    const totalVotes: number = dataAboutRev?.reduce((total, item) => total + item.votes, 0) || 0;

    const data = [
        { category: 'Отличное', votes: 0 },
        { category: 'Средний', votes: 0 },
        { category: 'Ниже среднего', votes: 0 },
        { category: 'Нормально', votes: 0 },
        { category: 'Плохо', votes: 0 },
    ];

    return (
        <div className={`${styleReview.review} `}>
            <div className={styleReview.text}>Reviews</div>
            <div className={`${styleReview.allResults} df`}>
                <div className={`${styleReview.block}   dfca`}>
                    <div className={styleReview.inner}>
                        <div className={styleReview.reviewNum}>4.8</div>
                        <div className={styleReview.lengthReview}>of {totalVotes} reviews</div>
                    </div>
                </div>
                <div className={styleReview.static} style={{ width: '100%' }}>
                    {dataAboutRev ? (
                        dataAboutRev.map(d => (
                            <div className={`${styleReview.reviewItem} dfa`} key={d.category}>
                                <span className={styleReview.cate}>{d.category}</span>
                                <span className={styleReview.line}>
                                    <ProgressBar
                                        progress={Number(((d.votes / totalVotes) * 100).toFixed(2)) || 0}
                                        color='#ffb547;'
                                    />
                                </span>
                                <span className={styleReview.count}>{d.votes}</span>
                            </div>
                        ))
                    ) : (
                        <>
                            {data.map(d => (
                                <div className={`${styleReview.reviewItem} dfa`} key={d.category}>
                                    <span className={styleReview.cate}>{d.category}</span>
                                    <span className={styleReview.line}>
                                        <ProgressBar progress={0} color='#ffb547;' />
                                    </span>
                                    <span className={styleReview.count}>{d.votes}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;
