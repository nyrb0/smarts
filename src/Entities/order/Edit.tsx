import InputOrder from '@/shared/components/Order/components/Input/InputOrder';
import { usersOrder } from '@/shared/types/order/order.type';
import Modal from '@/shared/UI/Modal/Modal';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import style from './Edit.module.scss';
import Button from '@/shared/UI/Button/Button';

interface EditProps {
    id: string;
    openClosed: { isOpen: boolean; close: () => void };
}
const Edit: FC<EditProps> = ({ id, openClosed: { isOpen, close } }) => {
    const [address, setAddress] = useState<usersOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const get = async () => {
            try {
                const { data, status } = await axios(`/api/address/${id}`);
                if (status === 200) {
                    setAddress(data);
                    setLoading(false);
                }
            } catch (err) {
                throw new Error('Ошибка при получении адресса');
            }
        };
        get();
    }, [id]);

    if (loading || !address) {
        return (
            <Modal
                isOpen={isOpen}
                close={() => {
                    close();
                    setAddress(null);
                }}
            >
                <div className={style.emptyWidget} />
                <div className={style.emptyWidget} />
                <div className={style.emptyWidget} />
                <div className={style.emptyWidget} />
                <div className={style.emptyWidget} />
            </Modal>
        );
    } else {
        return (
            <Modal
                isOpen={isOpen}
                close={() => {
                    close();
                    setAddress(null);
                }}
            >
                <div className={style.edit}>
                    <h3>Редактировать</h3>
                    <p>Название</p>
                    <InputOrder value={address.title || ''} onChange={(v: string) => null} placeholder={'Название'} />
                    <p>Номер</p>
                    <InputOrder value={address.number || ''} onChange={(v: string) => null} placeholder={'Номер'} />
                    <p>Адресс</p>
                    <InputOrder value={address.place.addressNumber || ''} onChange={(v: string) => null} placeholder={'Адресс'} />
                    <p>Город</p>
                    <InputOrder value={address.place.city || ''} onChange={(v: string) => null} placeholder={'Город'} />
                    <p>Регион</p>
                    <InputOrder value={address.place.region || ''} onChange={(v: string) => null} placeholder={'Регион'} />
                    <p>Улица</p>
                    <InputOrder value={address.place.street || ''} onChange={(v: string) => null} placeholder={'Улица'} />
                    <div className={`${style.btns} dfc`}>
                        <Button
                            style={{ background: address.orderLocation ? '#000' : '', color: address.orderLocation ? '#fff' : '#000', border: 6 }}
                            onClick={() => setAddress(prev => (prev ? { ...prev, orderLocation: true } : prev))}
                        >
                            Офис
                        </Button>
                        <Button
                            style={{ background: address.orderLocation ? '' : '#000', color: address.orderLocation ? '#000' : '#fff', border: 6 }}
                            onClick={() => setAddress(prev => (prev ? { ...prev, orderLocation: false } : prev))}
                        >
                            Дом
                        </Button>
                    </div>
                    <div className={`${style.saveBtn} dfc`}>
                        <span>
                            <Button style={{ background: '#000', color: '#fff', border: 6 }} onClick={() => null}>
                                Сохранить
                            </Button>
                        </span>
                    </div>
                </div>
            </Modal>
        );
    }
};
export default Edit;
