import LocationIcon from '@/app/assets/img/order/Locatdion.png';
import PaymentIcon from '@/app/assets/img/order/Payment.png';
import ShippingIcon from '@/app/assets/img/order/Shipping2.png';
import { FC } from 'react';
import { OrderStagesStyled, OrderStagesTheStages, OrderStagesTitleStyled } from './StagesOrder.styled';
import Image from 'next/image';

interface StagesOrderProps {
    stages: 'shipping' | 'location' | 'payment';
    isTheStage: boolean;
}

const iconMapping = {
    location: LocationIcon,
    shipping: ShippingIcon,
    payment: PaymentIcon,
};

const nameMapping = {
    location: 'Aдресс',
    shipping: 'Доставка',
    payment: 'Оплата',
};

const StagesOrder: FC<StagesOrderProps> = ({ stages, isTheStage }) => {
    return (
        <OrderStagesStyled isTheStages={isTheStage}>
            <Image src={iconMapping[stages]} alt={`${stages} иконка`} />
            <div style={{ marginLeft: 5 }}>
                <OrderStagesTheStages>Этап</OrderStagesTheStages>
                <OrderStagesTitleStyled>{nameMapping[stages]}</OrderStagesTitleStyled>
            </div>
        </OrderStagesStyled>
    );
};
``;

export default StagesOrder;
