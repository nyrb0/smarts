import { FC, useState } from 'react';
import st from './SelectBorder.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';

interface CusSelI {
    values: string[];
    changes: (s: string) => void;
    sel: string | undefined;
    defaultValue: string;
}

const SelectBorder: FC<CusSelI> = ({ values, changes, sel, defaultValue }) => {
    const [open, setOpen] = useState(false);
    const clickOptions = (s: string) => {
        setOpen(false);
        changes(s);
    };
    return (
        <div className={st.select}>
            <div className={st.category} onClick={() => setOpen(prev => !prev)}>
                <div>{sel || defaultValue || 'Выберете'}</div>
                <div className={st.arrow}>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
            </div>
            {open && (
                <div className={`${st.options} `}>
                    <div style={{ width: '100%' }}>
                        {open &&
                            values.length &&
                            values.map(v => (
                                <div key={v} className={st.values} onClick={() => clickOptions(v)}>
                                    {v}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectBorder;
