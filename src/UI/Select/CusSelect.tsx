import { FC, useState } from 'react';
import st from './CusSelect.module.scss';

interface CusSelI {
    values: string[] | number[];
}

const CusSelect: FC<CusSelI> = ({ values }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={st.select}>
            {open &&
                values.length &&
                values.map(v => (
                    <div key={v} className={st.values}>
                        {v}
                    </div>
                ))}
        </div>
    );
};

export default CusSelect;
