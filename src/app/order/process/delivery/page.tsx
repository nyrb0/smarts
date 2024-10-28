import stylesDelivery from '@/styles/PagesModules/order/Delivery.module.scss';

const DeliveryPage = () => {
    return (
        <div className={`${stylesDelivery.delivery} container `}>
            <h2 className={stylesDelivery.titleStages}>Shipment Method</h2>
        </div>
    );
};

export default DeliveryPage;
