import styleRa from './Radio.module.scss';

interface RadioOption<T> {
    value: T;
    label: string;
    money: number;
}

interface RadioI<T> {
    options: RadioOption<T>[];
    selected: T;
    onChange: (value: T) => void;
}

const Radio = <T extends string | number>({ options, selected, onChange }: RadioI<T>) => {
    return (
        <div className={styleRa.label}>
            {options.map(({ value, label, money }) => (
                <label key={String(value)} className='dfa '>
                    <input type='radio' value={String(value)} checked={selected === value} onChange={() => onChange(value)} />
                    {money} {label}
                </label>
            ))}
        </div>
    );
};

export default Radio;
