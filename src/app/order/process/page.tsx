'use client';
import CardAddress from '@/shared/components/Order/components/CardAddres/CardAddress';
import StagesOrder from '@/shared/components/Order/components/stages/StagesOrder';
import styledProcess from '@/styles/PagesModules/order/Process.module.scss';

// icons
import AddBtn from '@/app/assets/img/order/Plus.png';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import Modal from '@/shared/UI/Modal/Modal';
import IsOpenEdirAddressContext, { ContextAddressEdit } from '@/shared/context/order/isOpenEditAddress/IsOpenEdirAddress';
import { observer } from 'mobx-react-lite';
import userOrder from '@/app/store/user/address';
import InputOrder from '@/shared/components/Order/components/Input/InputOrder';
import Button from '@/shared/UI/Button/Button';
import Mark from '@/shared/image/gif/mark ok.gif';
import { useRouter } from 'next/navigation';
import { usersOrder } from '@/shared/types/order/order.type';
import Edit from '@/Entities/order/Edit';

const Process = () => {
    const [warning, setWarning] = useState<string | null>(null);
    const [savedNotification, setSavedNotification] = useState(false);
    const [isOffice, setIsOffice] = useState(false);
    const [isOpenEditAddress, setIsopenEditAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(localStorage.getItem('addressSelecred') || '');
    const [toEditAddress, setToEditAddress] = useState('');
    const { deleteAddress } = userOrder;
    const [addresses, setAddresses] = useState({
        title: '',
        number: '',
        orderLocation: isOffice,
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

    const router = useRouter();
    const toServerAddress = async (data: typeof addresses) => {
        try {
            fetch(`/api/address`, {
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
    const regex = /^[a-zA-Zа-яА-Я0-9]*$/;

    const testRegex = (value: string, onSuccess: () => void, errorText: string) => {
        if (regex.test(value)) {
            setWarning('');
        } else {
            setWarning(errorText);
        }
        onSuccess();
    };

    const handleToAddAddres = () => {
        const { title, number, orderLocation, place } = addresses;
        const { region, city, street, addressNumber } = place;
        const fields = { title, number, region, city, street, addressNumber };
        const object = Object.values(fields);
        if (object.every(isEmpty => !isEmpty.trim())) {
            setWarning('Заполните все поля!');
            return;
        }
        if (!object.every(field => regex.test(field))) {
            setWarning('Пишите без символов!');
            return;
        }
        setWarning(null);
        setWarning('Успешно добавлено');
        setIsAddress(false);
        notification(2000);
        toServerAddress(addresses);

        setAddresses({
            title: '',
            number: '',
            orderLocation: false,
            place: {
                region: '',
                city: '',
                street: '',
                addressNumber: '',
            },
        });
    };

    const handleSaveSelecredAddress = (e: string) => {
        localStorage.setItem('addressSelecred', e);
        setSelectedAddress(e);
    };

    const nextToStages = () => {
        if (selectedAddress) {
            router.push('/order/process/delivery');
        }
    };

    return (
        <div className={`${styledProcess.process} container`}>
            <Modal isOpen={savedNotification} visibleX={false}>
                <div className={`${styledProcess.thank} dfc`}>
                    <div>
                        <div className='dfc'>
                            <Image src={Mark} alt='mark' />
                        </div>
                        <div className={styledProcess.thankText}>Добавлен ваш адресс</div>
                    </div>
                </div>
            </Modal>
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
                                'В поле "Название" нельзя писать символы'
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
                                    setAddresses(prev => ({ ...prev, number: v }));
                                },
                                'В поле "Номер" нельзя писать символы'
                            )
                        }
                        placeholder={'Номер'}
                        required
                    />

                    <InputOrder
                        value={addresses.place.city}
                        onChange={(v: string) =>
                            testRegex(
                                v,
                                () => {
                                    setAddresses(prev => ({ ...prev, place: { ...prev.place, city: v } }));
                                },
                                'В поле "Город" нельзя писать символы'
                            )
                        }
                        placeholder={'Город'}
                        required
                    />
                    <InputOrder
                        value={addresses.place.region}
                        onChange={(v: string) =>
                            testRegex(
                                v,
                                () => {
                                    setAddresses(prev => ({ ...prev, place: { ...prev.place, region: v } }));
                                },
                                'В поле "Регион" нельзя писать символы'
                            )
                        }
                        placeholder={'Регион'}
                        required
                    />
                    <div className={`${styledProcess.theNumberAddress} df`}>
                        <div style={{ width: '100%' }}>
                            <InputOrder
                                value={addresses.place.street}
                                onChange={(v: string) =>
                                    testRegex(
                                        v,
                                        () => {
                                            setAddresses(prev => ({ ...prev, place: { ...prev.place, street: v } }));
                                        },
                                        'В поле "Улица" нельзя писать символы'
                                    )
                                }
                                placeholder={'Улица'}
                                required
                            />
                        </div>
                        <div style={{ width: '100%' }}>
                            <InputOrder
                                value={addresses.place.addressNumber}
                                onChange={(v: string) =>
                                    testRegex(
                                        v,
                                        () => {
                                            setAddresses(prev => ({ ...prev, place: { ...prev.place, addressNumber: v } }));
                                        },
                                        'В поле "Номер дома" нельзя писать символы'
                                    )
                                }
                                required
                                placeholder={'Номер дома'}
                            />
                        </div>
                    </div>
                    <div className={`${styledProcess.btns} dfc`}>
                        <Button
                            style={{ background: isOffice ? '#000' : '', color: isOffice ? '#fff' : '#000', border: 6 }}
                            onClick={() => setIsOffice(true)}
                        >
                            Офис
                        </Button>
                        <Button
                            style={{ background: isOffice ? '' : '#000', color: isOffice ? '#000' : '#fff', border: 6 }}
                            onClick={() => setIsOffice(false)}
                        >
                            Дом
                        </Button>
                    </div>
                    <p className={styledProcess.warning}>{warning}</p>
                    <div className={styledProcess.btn} onClick={() => handleToAddAddres()}>
                        <Button style={{ background: '#000', color: 'white', border: 6 }}>Добавить</Button>
                    </div>
                </form>
            </Modal>
            {toEditAddress && (
                <Edit
                    id={toEditAddress}
                    openClosed={{
                        isOpen: isOpenEditAddress,
                        close: () => {
                            setIsopenEditAddress(false);
                        },
                    }}
                />
            )}
            <div className={styledProcess.select}>Выбирайте адресс</div>
            <div>
                {userOrder.addresses.map(order => (
                    <div key={order.id} onClick={() => {}}>
                        <CardAddress
                            onChange={handleSaveSelecredAddress}
                            cheked={selectedAddress}
                            stage={order}
                            toEdit={() => {
                                setToEditAddress(order.id);
                                setIsopenEditAddress(true);
                            }}
                            toDel={() => deleteAddress(order.id)}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styledProcess.btnAdd} dfc`}>
                <button onClick={() => setIsAddress(true)}>
                    <Image src={AddBtn} alt='add button' className={styledProcess.plusBtn} />
                    <p style={{ marginTop: 8 }}>Добавить адресс</p>
                </button>
            </div>
            <div className={`${styledProcess.nextBtn} df`}>
                <div className={`${styledProcess.cnr} df`}>
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

export default observer(Process);
