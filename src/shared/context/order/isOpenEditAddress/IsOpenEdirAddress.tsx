import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

interface AddressEditI {
    openEdit: boolean;
    setOpenEdit: Dispatch<SetStateAction<boolean>>;
}

export const ContextAddressEdit = createContext<AddressEditI | null>(null);

const IsOpenEdirAddressContext = ({ children }: { children: ReactNode }) => {
    const [openEdit, setOpenEdit] = useState(false);

    return <ContextAddressEdit.Provider value={{ openEdit, setOpenEdit }}>{children}</ContextAddressEdit.Provider>;
};

export default IsOpenEdirAddressContext;
