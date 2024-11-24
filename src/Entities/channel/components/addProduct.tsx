import Modal from '@/shared/UI/Modal/Modal';
import { FC } from 'react';

interface addProductProps {
    isActive: { isActive: boolean; close: () => void };
}

const addProduct: FC<addProductProps> = ({ isActive }) => {
    return (
        <Modal isOpen={isActive.isActive} close={isActive.close}>
            jfjdb
        </Modal>
    );
};

export default addProduct;
