import stylesCardAddress from '@/styles/componentsModules/Order/CardAddres.module.scss';
import { FC } from 'react';

//icons
import editIcon from '@/app/assets/img/order/Edit.png';
import delIcon from '@/app/assets/img/order/Close.png';
import Edit from '@/app/profile/edit/page';
import Image from 'next/image';

interface CardAddressProps {
    stage: {
        code: string;
        title: string;
        place: PlaceProps;
        number: string;
    };
    location: 'office' | 'home';
}
interface PlaceProps {
    region: string;
    city: string;
    street: string;
    addressNumber: string;
}

const CardAddress: FC<CardAddressProps> = ({ stage, location }) => {
    return (
        <div className={`${stylesCardAddress.address} dfj`}>
            <div className='df'>
                <div className={stylesCardAddress.radio}>
                    <input type='radio' />
                </div>
                <div className={`${stylesCardAddress.inner} `}>
                    <div className={`${stylesCardAddress.location} dfa`}>
                        <div>
                            {stage.code} {stage.title}
                        </div>
                        <div className={stylesCardAddress.isPlace}>{location}</div>
                    </div>
                    <div className={stylesCardAddress.theCarrectAddres}>
                        {stage.place.region},{stage.place.city},{stage.place.street}, {stage.place.addressNumber}
                    </div>
                    <div className={stylesCardAddress.number}>{stage.number}</div>
                </div>
            </div>
            <div className={`${stylesCardAddress.edits} dfj`}>
                <Image src={editIcon} alt='edit' />
                <Image src={delIcon} alt='del' />
            </div>
        </div>
    );
};

export default CardAddress;
