import styled from 'styled-components';

const OrderInputStyled = styled.input`
    border: 0.5px solid #9f9f9f;
    border-radius: 7px;
    height: 56px;
    width: 100%;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    font-size: 14px;
    margin-bottom: 24px;
`;
interface OrderButtonInputStyledProps {
    colorBtn: string;
}
const OrderButtonInputStyled = styled.button<Partial<OrderButtonInputStyledProps>>`
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    border: 1px solid var(--main-black);
    border-radius: 6px;
    background: ${props => (props.colorBtn ? props.colorBtn : 'transparent')};
    padding: 8px;
    min-width: 76px;
    height: 32px;
    position: absolute;
    top: 15px;
    right: 16px;
    z-index: 10;
`;

const OrderInt = styled.div`
    position: relative;
`;

export { OrderInputStyled, OrderButtonInputStyled, OrderInt };
