'use client';

import stylesDelivery from '@/styles/PagesModules/order/Delivery.module.scss';
import CardStatus from '../../../../Entities/order/components/CardStatus/CardStatus';
import { useState } from 'react';
import Button from '@/shared/UI/Button/Button';
import { useRouter } from 'next/navigation';
import notificationlGlobalStore from '@/app/store/notificationGlobal/notificationlGlobalStore';
import { v4 as uuidv4 } from 'uuid';

const DeliveryPage = ({ shipmentData }: { shipmentData: any }) => {
    const [selectedAddress, setSelectedAddress] = useState<string>();
    const router = useRouter();
    const idGeneration = uuidv4;
    const nextToStages = () => {
        if (selectedAddress) {
            router.push('/order/process/payment');
            notificationlGlobalStore.AddToNotification({
                id: idGeneration(),
                title: 'Доставка',
                status: 'right',
                desc: 'Успешно выполнено',
            });
        } else {
            notificationlGlobalStore.AddToNotification({
                id: idGeneration(),
                title: 'Доставка',
                status: 'error',
                desc: 'Выберите услугу доставки для следущего этапа',
            });
        }
    };
    return (
        <div className={`${stylesDelivery.delivery} container `}>
            <h2 className={stylesDelivery.titleStages}>Методы доставки:</h2>
            <div className={stylesDelivery.rates}>
                <CardStatus onChange={(e: string) => setSelectedAddress(e)} />
            </div>
            <div className={`${stylesDelivery.nextBtn} df`}>
                <div className={`${stylesDelivery.cnr} df`}>
                    <Button style={{ background: '#fff', color: '#000', border: 6 }} onClick={() => history.back()}>
                        Назад
                    </Button>
                    <Button style={{ background: '#000', color: '#fff', border: 6 }} onClick={nextToStages}>
                        Дальше
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeliveryPage;
