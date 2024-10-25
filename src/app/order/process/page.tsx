'use client';
import CardAddress from '@/shared/Order/components/CardAddres/CardAddress';
import StagesOrder from '@/shared/Order/components/stages/StagesOrder';
import styledProcess from '@/styles/PagesModules/order/Process.module.scss';

// icons
import AddBtn from '@/app/assets/img/order/Plus.png';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Modal from '@/shared/UI/Modal/Modal';
import IsOpenEdirAddressContext, { ContextAddressEdit } from '@/shared/context/order/isOpenEditAddress/IsOpenEdirAddress';
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
            jfjsv df
        </Modal>
    );
};

const Process = () => {
    const [data, setData] = useState([]);
    const [warning, setWarning] = useState<string | null>(null);
    const [savedNotification, setSavedNotification] = useState(false);
    const [isOffice, setIsOffice] = useState(false);
    const [isAllFields, setIsAllFields] = useState(true);
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
    const [isAddAddress, setIsAddress] = useState(false);
    const notification = (ms: number) => {
        setSavedNotification(true);
        setTimeout(() => {
            setSavedNotification(false);
            setWarning(null);
        }, ms);
    };
    const toServerAddress = async (data: typeof addresses) => {
        try {
            fetch(`/api/users/${user.userFullData?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (err) {
            throw new Error('Ошибка при получение данных');
        } finally {
        }
    };

    const testRegex = (value: string, onSuccess: () => void, errorText: string) => {
        const regex = /^[a-zA-Z0-9]*$/;
        if (regex.test(value)) {
            if (!isAllFields) {
                setIsAllFields(true);
            }
            setWarning('');
        } else {
            if (isAllFields) {
                setIsAllFields(false);
            }
            setWarning(errorText);
        }
        onSuccess();
        // setWarning('Only letters and numbers are allowed!');
    };

    const handleToAddAddres = () => {
        const { title, number, orderLocation, place } = addresses;
        const { region, city, street, addressNumber } = place;
        if (!title.trim() || !number.trim() || !orderLocation.trim() || !region.trim() || !city.trim() || !street.trim() || !addressNumber.trim()) {
            setWarning('Заполните все поля!');
            return;
        }
        setWarning('Успешно добавлено');
        setWarning(null);
        notification(2000);
        toServerAddress(addresses);
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

    // console.log(JSON.stringify(userOrder.addresses));
    return (
        <div className={`${styledProcess.process} container`}>
            {savedNotification && <Modal isOpen={savedNotification}>{warning}</Modal>}
            {isAddAddress && (
                <Modal isOpen={isAddAddress} close={() => setIsAddress(false)}>
                    <form action='' className={styledProcess.added}>
                        <label className={`${styledProcess.add} dfc`}>Добавьте адресс</label>
                        <InputOrder
                            value={addresses.title}
                            onChange={(v: string) =>
                                testRegex(
                                    v,
                                    () => {
                                        setAddresses(prev => ({ ...prev, title: v }));
                                    },
                                    'vn'
                                )
                            }
                            placeholder={'Название'}
                            required
                        />
                        <InputOrder
                            value={addresses.number}
                            onChange={(v: string) =>
                                testRegex(
                                    v,
                                    () => {
                                        setWarning('');
                                        setAddresses(prev => ({ ...prev, number: v }));
                                    },
                                    'В поле "название" нельзя писать символы'
                                )
                            }
                            placeholder={'Номер'}
                            required
                        />
                        <InputOrder
                            value={addresses.place.city}
                            onChange={(v: string) => setAddresses(prev => ({ ...prev, place: { ...prev.place, city: v } }))}
                            placeholder={'Город'}
                            required
                        />
                        <div className={`${styledProcess.theNumberAddress} df`}>
                            <div style={{ width: '100%' }}>
                                <InputOrder
                                    value={addresses.place.street}
                                    onChange={(v: string) => setAddresses(prev => ({ ...prev, place: { ...prev.place, street: v } }))}
                                    placeholder={'Улица'}
                                    required
                                />
                            </div>
                            <div style={{ width: '100%' }}>
                                <InputOrder
                                    value={addresses.place.addressNumber}
                                    onChange={(v: string) => setAddresses(prev => ({ ...prev, place: { ...prev.place, addressNumber: v } }))}
                                    required
                                    placeholder={'Номер дома'}
                                />
                            </div>
                        </div>
                        <div className={`${styledProcess.btns} dfc`}>
                            <Button style={{ background: '#000', color: 'white', border: 6 }} onClick={() => setIsOffice(false)}>
                                Офис
                            </Button>
                            <Button style={{ background: '', color: '#000', border: 6 }} onClick={() => setIsOffice(true)}>
                                Дом
                            </Button>
                        </div>
                        <p className={styledProcess.warning}>{warning}</p>
                        <div className={styledProcess.btn}>
                            <Button style={{ background: '#000', color: 'white', border: 6 }}>Добавить</Button>
                        </div>
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
            <button onClick={() => setIsAddress(true)}>
                <Image src={AddBtn} alt='add button' className='dfc' />
            </button>
        </div>
    );
};

export default observer(Process);
