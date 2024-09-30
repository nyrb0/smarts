'use client';
import { FC, ReactNode, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

import st from './Select.module.scss';

interface CusSelI {
    name: string;
    children?: ReactNode;
    values: string[];
    onChange: (v: string) => void;
    selected: string;
}

const Select: FC<CusSelI> = ({ name, children, values, onChange, selected }) => {
    const [open, setOpen] = useState(false);
    const [visibleSelected, setVisibleSelected] = useState<boolean>(false);

    const changeValue = (v: string) => {
        setVisibleSelected(true);
        setOpen(false);
        onChange(v);
    };
    const arr = [1, 2, 3, 4, 5];

    return (
        <div className={st.select}>
            <div className={`${st.out} dfa`} onClick={() => setOpen(prev => !prev)}>
                <div className={st.name}>{visibleSelected ? selected : name}</div>
                <div className={st.arrow}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
            </div>
            <hr style={{ color: 'black', opacity: 0.3 }} />
            {open ? (
                <div className={st.inner}>
                    {values.map(v => (
                        <div className={st.single} key={v} onClick={() => changeValue(v)}>
                            {v.split('').splice(0, 1).toString().toLocaleUpperCase() +
                                v.split('').splice(1, v.length).join('')}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Select;
