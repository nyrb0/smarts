import { Phone } from '../Phones/TypePhone.types';

export type usersType = {
    id: string;
    userName: string;
    name: string;
    lastName?: string;
    password: string;
    saved: Phone[];
    country: string;
    city: string;
    email: string;
    number: string;
    education: string;
};
