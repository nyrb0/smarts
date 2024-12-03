'use client';

import stylesDelivery from '@/styles/PagesModules/order/Delivery.module.scss';
import CardStatus from '../../../../Entities/order/components/CardStatus/CardStatus';
import { useState } from 'react';
import Button from '@/shared/UI/Button/Button';

const DeliveryPage = ({ shipmentData }: { shipmentData: any }) => {
    return (
        <div className={`${stylesDelivery.delivery} container `}>
            <h2 className={stylesDelivery.titleStages}>Методы доставки:</h2>
            <div className={stylesDelivery.rates}>
                <CardStatus />
            </div>
            <div className={`${stylesDelivery.nextBtn} df`}>
                <div className={`${stylesDelivery.cnr} df`}>
                    <Button style={{ background: '#fff', color: '#000', border: 6 }} onClick={() => history.back()}>
                        Назад
                    </Button>
                    <Button style={{ background: '#000', color: '#fff', border: 6 }} onClick={() => null}>
                        Дальше
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
