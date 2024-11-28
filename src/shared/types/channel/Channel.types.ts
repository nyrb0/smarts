import { Phone } from '../Phones/TypePhone.types';
export type ChannelTypes = {
    id: string;
    author: string;
    name: string;
    nick_name: string;
    subsrcibes: number;
    tenology: Phone[];
    view: number;
    image_profile: string;
    data: string;
    desciption: string;
    date: number;
    country: string;
    email: string;
    main_url: string | null;
    notification: boolean;
    social: SocialType;
};

export type SocialType = {
    tg: string;
    vk: string;
    tt: string;
    ins: string;
    offical: string;
};
