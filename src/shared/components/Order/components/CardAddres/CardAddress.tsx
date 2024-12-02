import stylesCardAddress from '@/styles/componentsModules/Order/CardAddres.module.scss';
import { FC } from 'react';

//icons
import editIcon from '@/app/assets/img/order/Edit.png';
import delIcon from '@/app/assets/img/order/Close.png';
import Image from 'next/image';
import { usersOrder } from '@/shared/types/order/order.type';

interface CardAddressProps {
    stage: usersOrder;
    toEdit: () => void;
    toDel: () => void;
}

const CardAddress: FC<CardAddressProps> = ({ stage, toEdit, toDel }) => {
    return (
        <div className={`${stylesCardAddress.address} dfj`}>
            <div className='df'>
                <div className={stylesCardAddress.radio}>
                    <input type='radio' />
                </div>
                <div className={`${stylesCardAddress.inner} `}>
                    <div className={`${stylesCardAddress.location} dfa`}>
                        <div>
                            {stage.id} {stage.title}
                        </div>
                        <div className={stylesCardAddress.isPlace}>{stage.orderLocation ? 'Дом' : 'Офис'}</div>
                    </div>
                    <div className={stylesCardAddress.theCarrectAddres}>
                        {stage.place.region},{stage.place.city},{stage.place.street}, {stage.place.addressNumber}
                    </div>
                    <div className={stylesCardAddress.number}>{stage.number}</div>
                </div>
            </div>
            <div className={`${stylesCardAddress.edits} dfj`}>
                <Image src={editIcon} alt='edit' onClick={toEdit} />
                <Image src={delIcon} alt='del' onClick={toDel} />
            </div>
        </div>
    );
};

export default CardAddress;
