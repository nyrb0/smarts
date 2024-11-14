import MyChannel from '@/shared/components/MyChannel';
import { Phone, Price } from '../Phones/TypePhone.types';

export type usersType = {
    id: string;
    userName: string;
    name: string;
    image_profile: string;
    lastName?: string;
    have_money: Price;
    password: string;
    saved: Phone[];
    my_channels: My_channelsTypes[];
    country: string;
    city: string;
    email: string;
    number: string;
    education: string;
    subscriptions: string[];
};

export type My_channelsTypes = {
    id: string;
    name: string;
};
