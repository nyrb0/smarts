import Modal from '@/shared/UI/Modal/Modal';
import { FC, useEffect, useState } from 'react';
import stylesChannel from '@/styles/PagesModules/channel/EditChannel.module.scss';
import InputGray from '@/shared/UI/Input/InputPrime/InputPrime';
import TextArea from '@/shared/components/textArea/TextArea';
import Btn from '@/shared/UI/Button/Button';
import SelectBorder from '@/shared/UI/Select/Transparent_border/SelectBorder';
import { ChannelTypes } from '@/shared/types/User/Channel.types';
import { observer } from 'mobx-react-lite';
import channelStore from '@/app/store/channel/channelStore';
import axios from 'axios';

interface EditChannelProps {
    openClose: { close: () => void; open: boolean };
    data: ChannelTypes;
}

const EditChannel: FC<EditChannelProps> = observer(({ openClose, data }) => {
    const [dataInt, setDataInt] = useState({
        name: data.name,
        desciption: data.desciption,
        email: data.email,
        nick_name: data.nick_name,
        country: data.country,
    });
    const [countrySelect, setCountrySelect] = useState<string>(data?.country);

    const [country, setCountry] = useState<string[]>();
    const handleCounry = (e: string) => {
        setDataInt(prev => ({ ...prev, country: e }));
        setCountrySelect(e);
    };
    const isPrevHandler = (prev: any, d: any) => {
        return Object.fromEntries(Object.entries({ ...prev, ...d }).filter(([key, value]) => prev[key] !== d[key]));
    };
    const sendtoServer = () => {
        const { name, desciption, email, nick_name, country } = data;
        const prevData = { name, desciption, email, nick_name, country };
        const isPrevValue = isPrevHandler(prevData, dataInt);
        if (Object.values(isPrevValue).length <= 0) return;

        // первый аргумент id, второй body
        channelStore.editSave(data.id, isPrevHandler(prevData, dataInt));
        location.reload();
    };
    // поднимает выбранную страну на первое место
    const upSelectCountry = (c: string[], s: string) => {
        return;
    };
    useEffect(() => {
        async function getCounty() {
            try {
                const get = await axios.get('/api/country');
                const dataCountry: string[] = await get.data;
                const updatedCountryList = await [countrySelect, ...dataCountry.filter(f => f !== countrySelect)];
                setCountry(updatedCountryList);
            } catch (err) {
                console.log(`Ошибка: ${err}`);
            }
        }
        getCounty();
    }, []);

    return (
        <Modal isOpen={openClose.open} close={openClose.close}>
            <div className={stylesChannel.editChannel}>
                <h2>Редактирование</h2>
                <InputGray value={dataInt.name} holder='Имя канала' onChange={(e: string) => setDataInt(prev => ({ ...prev, name: e }))} />
                <InputGray value={dataInt.nick_name} holder='Никнэйм' onChange={(e: string) => setDataInt(prev => ({ ...prev, nick_name: e }))} />
                <InputGray value={dataInt.email} holder='email' onChange={(e: string) => setDataInt(prev => ({ ...prev, email: e }))} />
                <p className={stylesChannel.lengthDesc}>
                    <span style={{ color: dataInt.desciption.length >= 500 ? 'red' : '' }}>{dataInt.desciption.length}</span>/500
                </p>
                <TextArea
                    value={dataInt.desciption}
                    onChange={(e: string) => {
                        setDataInt(prev => ({ ...prev, desciption: e }));
                    }}
                    styled={{ height: 80 }}
                    holder='Описание'
                />
                <div className={stylesChannel.select}>
                    <SelectBorder defaultValue={data.country} values={country!} changes={handleCounry} sel={countrySelect} />
                </div>
                <div className={`${stylesChannel.btnSave} dfc`}>
                    <span>
                        <Btn
                            onClick={sendtoServer}
                            style={{
                                background: '#000',
                                color: '#fff',
                                border: 8,
                            }}
                        >
                            Сохранить
                        </Btn>
                    </span>
                </div>
            </div>
        </Modal>
    );
});

export default EditChannel;
