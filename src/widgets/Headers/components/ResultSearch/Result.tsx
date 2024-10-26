import { SearchStoreType } from '@/shared/types/User/SearchStore.types';
import resultS from '@/styles/componentsModules/header/Result.module.scss';
import { FC, useState } from 'react';
import { MdOutlineReplay } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import searchStore from '@/app/store/searchStore/searchStore';
import { useRouter } from 'next/navigation';

interface ResultI {
    isIconAgain?: boolean;
    result: SearchStoreType[];
    story: SearchStoreType[];
    close: (b: boolean) => void;
    setValue: (v: string) => void;
}
interface TitleSearchI {
    data: SearchStoreType[];
    isIconAgain: boolean;
    close: (b: boolean) => void;
    setValue?: (v: string) => void;
}

const TitlesSearch: FC<TitleSearchI> = ({ data, isIconAgain, close, setValue }) => {
    const router = useRouter();
    return (
        <>
            {data.map(stories => (
                <div
                    key={stories.id}
                    className={`${resultS.itemStory} dfa`}
                    onClick={() => {
                        if (setValue) {
                            setValue(stories.name);
                        } else {
                            close(true);
                            router.push(`/home/${stories.id}`);
                        }
                    }}
                >
                    <span style={{ marginRight: 8 }}>
                        <CiSearch />
                    </span>
                    <span style={{ marginRight: 8 }}>{stories.name}</span>
                    {isIconAgain && <MdOutlineReplay className={resultS.icvon} />}
                </div>
            ))}
        </>
    );
};

const Result: FC<ResultI> = ({ isIconAgain = true, result, story, close, setValue }) => {
    const [isVisibleStorySearch, setIsVisibleStorySearch] = useState(false);
    const { toDeleteStoreAll } = searchStore;
    return (
        <div className={resultS.result}>
            {!isVisibleStorySearch && (
                <div className={resultS.viewStory} onClick={() => setIsVisibleStorySearch(prev => !prev)}>
                    Истории поиска
                </div>
            )}
            {!isVisibleStorySearch ? (
                <TitlesSearch close={close} data={result} isIconAgain={false} />
            ) : (
                <TitlesSearch close={close} setValue={setValue} data={story} isIconAgain />
            )}
            {isVisibleStorySearch && (
                <>
                    {story.length > 0 && (
                        <div
                            className={resultS.viewStory}
                            onClick={() => {
                                toDeleteStoreAll();
                                setIsVisibleStorySearch(false);
                            }}
                        >
                            Очистить историю
                        </div>
                    )}
                    {!story.length && <div className={resultS.empty}>Пусто</div>}
                </>
            )}
        </div>
    );
};

export default Result;
