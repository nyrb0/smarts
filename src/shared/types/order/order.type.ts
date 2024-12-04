import { Phone } from '../Phones/TypePhone.types';

export type OrderType = {
    id: string;
    products: Phone[];
    addresses: usersOrder;
};

export type usersOrder = {
    id: string;
    number: string;
    title: string;
    place: UsersOrderPlace;
    orderLocation: boolean;
};

export type UsersOrderPlace = {
    region: string;
    city: string;
    street: string;
    addressNumber: string;
};
