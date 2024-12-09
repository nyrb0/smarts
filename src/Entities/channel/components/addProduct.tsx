import { ChannelTypes } from '@/shared/types/channel/Channel.types';
import { Phone } from '@/shared/types/Phones/TypePhone.types';
import InputPrime from '@/shared/UI/Input/InputPrime/InputPrime';
import Modal from '@/shared/UI/Modal/Modal';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';

interface addProductProps {
    isActive: { isActive: boolean; close: () => void };
    data: ChannelTypes;
}

const AddProduct: FC<addProductProps> = observer(({ isActive, data }) => {
    const { tenology } = data;
    const currentProducts = tenology;
    // type phone
    const [createChannel, setCreateChannel] = useState({
        id: '1',
        name: '',
        image: {
            url: '',
            gold: { '1': '', '2': '', '3': '', '4': '' },
            black: { '1': '', '2': '', '3': '', '4': '' },
            gray: { '1': '', '2': '', '3': '', '4': '' },
        },
        level: 5,
        isImproved: 1,
        price: {
            rub: 0,
            usd: 0,
            som: 0,
        },
        processor: 'A15 Bionic',
        camera: '',
        weigth: 0,
        battery: 0,
        ios: null,
        desc: '',
        screen: '',
        android: '',
        review: [
            {
                category: 'Отличное',
                votes: 0,
            },
            {
                category: 'Средний',
                votes: 0,
            },
            {
                category: 'Ниже среднего',
                votes: 0,
            },
            {
                category: 'Нормально',
                votes: 2,
            },
            {
                category: 'Плохо',
                votes: 0,
            },
        ],
        selected: {
            color: '',
            storage: '',
        },
        comments: [],
    });

    const [stages, setStages] = useState(false);

    return (
        <Modal isOpen={isActive.isActive} close={isActive.close}>
            <InputPrime value={createChannel.name} holder='Имя товара' onChange={(e: string) => setCreateChannel(prev => ({ ...prev, name: e }))} />
            <InputPrime value={createChannel.desc} holder='описание' onChange={(e: string) => setCreateChannel(prev => ({ ...prev, desc: e }))} />
        </Modal>
    );
});

export default AddProduct;
