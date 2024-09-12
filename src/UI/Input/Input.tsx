import { ChangeEvent, FC } from 'react';
import styles from './Input.module.scss';
interface InputI {
    onChange: (value: string) => void;
    value: string;
    placeholder: string;
    type?: string;
}

const Input: FC<InputI> = ({ onChange, value, placeholder, type = 'text' }) => {
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
        />
    );
};

export default Input;
