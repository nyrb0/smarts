import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { OrderButtonInputStyled, OrderInputStyled, OrderInt } from './InputOrder.styled';

interface InputPropsI {
    value: string;
    onChange: (e: string) => void;
    placeholder: string;
    isVisibleButton?: boolean;
    onClick?: () => void;
    required?: boolean;
}

const InputOrder: FC<InputPropsI> = ({
    value,
    onChange,
    placeholder,
    isVisibleButton = false,
    onClick,
    required = false,
}) => {
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <OrderInt>
            <OrderInputStyled
                value={value}
                placeholder={placeholder}
                type={'text'}
                onChange={changeValue}
                required={required}
            />
            {isVisibleButton && (
                <OrderButtonInputStyled type='button' onClick={onClick}>
                    Apply
                </OrderButtonInputStyled>
            )}
        </OrderInt>
    );
};

export default InputOrder;
