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
    code: number;
    title: string;
    place: UsersOrderPlace;
    number: string;
};

export type UsersOrderPlace = {
    region: string;
    city: string;
    street: string;
    addressNumber: string;
};
