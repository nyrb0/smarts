import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';
import { OrderButtonInputStyled, OrderInputStyled, OrderInt } from './InputOrder.styled';

interface InputPropsBase {
    value: string;
    onChange: (e: string) => void;
    placeholder?: string;
    required?: boolean;
}

interface InputPropsWithButton extends InputPropsBase {
    isVisibleButton: true;
    onClick: () => void;
    btnText: string;
    colorBtn: string;
}

interface InputPropsWithoutButton extends InputPropsBase {
    isVisibleButton?: false;
    onClick?: never;
    btnText?: never;
    colorBtn?: never;
}
type InputPropsI = InputPropsWithButton | InputPropsWithoutButton;

const InputOrder: FC<InputPropsI> = ({ value, onChange, placeholder, isVisibleButton = false, onClick, required = false, btnText, colorBtn }) => {
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <OrderInt>
            <OrderInputStyled value={value} placeholder={placeholder} type={'text'} onChange={changeValue} required={required} />
            {isVisibleButton && (
                <OrderButtonInputStyled type={'button'} onClick={onClick} colorBtn={colorBtn}>
                    {btnText}
                </OrderButtonInputStyled>
            )}
        </OrderInt>
    );
};

export default InputOrder;
