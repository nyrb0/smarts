'use client';
import { FC, useState } from 'react';
import st from './CusSelect.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

interface CusSelI {
    values: string[] | number[];
    text: string;
    changes?: () => void;
}

const CusSelect: FC<CusSelI> = ({ values, text }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={st.select}>
            <div className={`${st.selected}`}>
                <div className={st.inner}>
                    <div
                        className={st.categoty}
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <div>{text}</div>
                        <div>
                            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>
                    </div>
                </div>
                {open && (
                    <div className={`${st.options}`}>
                        {open &&
                            values.length &&
                            values.map(v => (
                                <div
                                    key={v}
                                    className={st.values}
                                    onClick={() => setOpen(false)}
                                >
                                    {v}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CusSelect;
