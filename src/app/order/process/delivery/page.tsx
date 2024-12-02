'use client';

import stylesDelivery from '@/styles/PagesModules/order/Delivery.module.scss';
import CardStatus from '../../../../Entities/order/components/CardStatus/CardStatus';
import { useState } from 'react';

const DeliveryPage = ({ shipmentData }: { shipmentData: any }) => {
    return (
        <div className={`${stylesDelivery.delivery} container `}>
            <h2 className={stylesDelivery.titleStages}>Shipment Method</h2>
            <div className={stylesDelivery.rates}>
                <CardStatus />
            </div>
        </div>
    );
};

export default DeliveryPage;
