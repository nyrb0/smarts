'use client';
import CardAddress from '@/shared/Order/components/CardAddres/CardAddress';
import StagesOrder from '@/shared/Order/components/stages/StagesOrder';
import styledProcess from '@/styles/PagesModules/order/Process.module.scss';

// icons
import AddBtn from '@/app/assets/img/order/Plus.png';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Modal from '@/shared/UI/Modal/Modal';
import IsOpenEdirAddressContext, {
    ContextAddressEdit,
} from '@/shared/context/order/isOpenEditAddress/IsOpenEdirAddress';

const Edit = () => {
    const openEditCon = useContext(ContextAddressEdit);
    if (!openEditCon) throw new Error('Error in ');
    const { openEdit, setOpenEdit } = openEditCon;

    return (
        <Modal isOpen={openEdit} close={() => setOpenEdit(false)}>
            re
        </Modal>
    );
};

const Process = () => {
    const test = [
        {
            code: 453,
            title: 'Бишкек',
            place: { region: 'Бишкек', city: 'Бишкек', street: 'Шабдан Баатыр', addressNumber: '140k' },
            number: '0700269301',
        },
        {
            code: 4533,
            title: 'Бишкек',
            place: { region: 'Бишкек', city: 'Бишкек', street: 'Шабдан Баатыр', addressNumber: '140k' },
            number: '0700269301',
        },
        {
            code: 4523,
            title: 'Бишкек',
            place: { region: 'Бишкек', city: 'Бишкек', street: 'Шабдан Баатыр', addressNumber: '140k' },
            number: '0700269301',
        },
    ];

    const handleToAddAddres = () => {};
    return (
        <div className={`${styledProcess.process} container`}>
            <IsOpenEdirAddressContext>
                <Edit />
            </IsOpenEdirAddressContext>
            <div className={`${styledProcess.stages} dfj`}>
                <StagesOrder stages='payment' isTheStage={true} />
                <StagesOrder stages='shipping' isTheStage={false} />
                <StagesOrder stages='payment' isTheStage={false} />
            </div>
            <div className={styledProcess.select}>Выбирайте адресс</div>
            <div>
                {test.map(order => (
                    <CardAddress stage={order} location='office' key={order.code} />
                ))}
            </div>
            <button>
                <Image src={AddBtn} alt='add button' className='dfc' />
            </button>
        </div>
    );
};

export default Process;
