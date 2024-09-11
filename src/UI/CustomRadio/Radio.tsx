import { FC } from 'react';

import styleRa from './Radio.module.scss';

interface RadioI {
    options: number[];
    selected: number;
    onChange: (value: number) => void;
}
const Radio: FC<RadioI> = ({ options, selected, onChange }) => {
    return (
        <div className={styleRa.label}>
            {options &&
                options.map(op => (
                    <label key={op}>
                        <div>
                            <input
                                type='radio'
                                value={op}
                                checked={selected === op}
                                onChange={() => onChange(op)}
                            />
                            {op}
                        </div>
                    </label>
                ))}
        </div>
    );
};

export default Radio;
