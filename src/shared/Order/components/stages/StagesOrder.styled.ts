import styled from 'styled-components';

type OrderStagesType = {
    isTheStages: boolean;
};

const OrderStagesStyled = styled.div<OrderStagesType>`
    opacity: ${style => (style.isTheStages ? '1' : '0.4')};
    display: flex;
    align-items: center;
`;

const OrderStagesTheStages = styled.div`
    font-weight: 500;
    font-size: 14px;
    line-height: 114%;
    letter-spacing: 0.03em;
    color: var(--main-black);
`;

const OrderStagesTitleStyled = styled.strong`
    font-weight: 800;
    font-size: 14px;
    line-height: 114%;
    letter-spacing: 0.03em;
    color: var(--main-black);
`;

export { OrderStagesStyled, OrderStagesTitleStyled, OrderStagesTheStages };
