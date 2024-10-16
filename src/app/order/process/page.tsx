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
import { observer } from 'mobx-react-lite';
import userOrder from '@/app/store/user/userOrder';
import InputOrder from '@/shared/Order/components/Input/InputOrder';
import Button from '@/shared/UI/Button/Button';
import user from '@/app/store/user/user';

const Edit = () => {
    const openEditCon = useContext(ContextAddressEdit);
    if (!openEditCon) throw new Error('Error in ');
    const { openEdit, setOpenEdit } = openEditCon;

    return (
        <Modal isOpen={openEdit} close={() => setOpenEdit(false)}>
            dmnnnn
        </Modal>
    );
};

const Process = () => {
    const [data, setData] = useState([]);
    const [warning, setWarning] = useState<string | null>(null);
    const [savedNotification, setSavedNotification] = useState(false);
    const [addresses, setAddresses] = useState({
        title: '',
        number: '',
        orderLocation: '',
        place: {
            region: '',
            city: '',
            street: '',
            addressNumber: '',
        },
    });
    const [addAddress, setAddress] = useState(false);

    const getData = async () => {};
    const notification = (ms: number) => {
        setSavedNotification(true);
        setTimeout(() => {
            setSavedNotification(false);
            setWarning(null);
        }, ms);
    };

    const handleToAddAddres = () => {
        const { title, number, orderLocation, place } = addresses;
        const { region, city, street, addressNumber } = place;
        if (
            !title.trim() ||
            !number.trim() ||
            !orderLocation.trim() ||
            !region.trim() ||
            !city.trim() ||
            !street.trim() ||
            !addressNumber.trim()
        ) {
            setWarning('Заполните все поля!');
            return;
        }
        setWarning('Успешно добавлено');
        setWarning(null);
        notification(2000);
        toServerAddress();
        setAddresses({
            title: '',
            number: '',
            orderLocation: '',
            place: {
                region: '',
                city: '',
                street: '',
                addressNumber: '',
            },
        });
    };

    const toServerAddress = async () => {
        try {
            fetch(`/api/users/${user.userFullData?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addAddress),
            });
        } catch (err) {
            throw new Error('Ошибка при получение данных');
        } finally {
        }
    };

    // console.log(JSON.stringify(userOrder.addresses));
    return (
        <div className={`${styledProcess.process} container`}>
            {savedNotification && <Modal isOpen={savedNotification}>{warning}</Modal>}
            {addAddress && (
                <Modal isOpen={addAddress} close={() => setAddress(false)}>
                    <form action='' className={styledProcess.added}>
                        <label className={`${styledProcess.add} dfc`}>Добавьте адресс</label>
                        <InputOrder
                            value={addresses.title}
                            onChange={(v: string) => setAddresses(prev => ({ ...prev, title: v }))}
                            placeholder={'Название'}
                            required
                        />
                        <InputOrder
                            value={addresses.number}
                            onChange={(v: string) => setAddresses(prev => ({ ...prev, number: v }))}
                            placeholder={'Номер'}
                            required
                        />
                        <div className={`${styledProcess.theNumberAddress} df`}>
                            <div style={{ width: '100%' }}>
                                <InputOrder
                                    value={addresses.title}
                                    onChange={(v: string) => setAddresses(prev => ({ ...prev, title: v }))}
                                    placeholder={'Улица'}
                                    required
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <InputOrder
                                    value={addresses.place.addressNumber}
                                    onChange={(v: string) =>
                                        setAddresses(prev => ({ ...prev, place: { ...prev.place, addressNumber: v } }))
                                    }
                                    required
                                    placeholder={'Номер дома'}
                                />
                            </div>
                        </div>
                        <div className={`${styledProcess.btns} dfj`}>
                            <Button
                                style={{ background: '#000', color: 'white', border: 6 }}
                                onClick={() => setAddresses(prev => ({ ...prev }))}
                            >
                                Офис
                            </Button>
                            <Button style={{ background: '', color: '#000', border: 6 }}>Дом</Button>
                        </div>
                        <p className={styledProcess.warning}>jfsbvh{warning}</p>
                        <Button style={{ background: '#000', color: 'white', border: 6 }}>Добавить</Button>
                    </form>
                </Modal>
            )}
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
                {userOrder.addresses.map(order => (
                    <CardAddress stage={order} location='office' key={order.code} />
                ))}
            </div>
            <button onClick={() => setAddress(true)}>
                <Image src={AddBtn} alt='add button' className='dfc' />
            </button>
        </div>
    );
};

export default observer(Process);
