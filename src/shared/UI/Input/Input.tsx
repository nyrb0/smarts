import { ChangeEvent, FC } from 'react';
import styles from './Input.module.scss';
interface InputI {
    onChange: (value: string) => void;
    value: string;
    placeholder: string;
    type?: string;
    required?: boolean;
}

const Input: FC<InputI> = ({
    onChange,
    value,
    placeholder,
    type = 'text',
    required = false,
}) => {
    const onChangeInput = (v: ChangeEvent<HTMLInputElement>) => {
        onChange(v.target.value);
    };
    return (
        <input
            className={styles.input}
            onChange={onChangeInput}
            type={type}
            value={value}
            placeholder={placeholder}
            required={required}
        />
    );
};

export default Input;
