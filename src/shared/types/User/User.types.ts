import { Phone, Price } from '../Phones/TypePhone.types';

export type usersType = {
    id: string;
    userName: string;
    name: string;
    lastName?: string;
    have_money: Price;
    password: string;
    saved: Phone[];
    country: string;
    city: string;
    email: string;
    number: string;
    education: string;
    order: usersOrder;
};

export type usersOrder = {
    code: string;
    number: string;
    title: string;
    place: UsersOrderPlace;
    orderLocation: string;
};

export type UsersOrderPlace = {
    region: string;
    city: string;
    street: string;
    addressNumber: string;
};
