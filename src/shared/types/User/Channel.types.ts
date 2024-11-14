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
    social: {
        tg: string | null;
        vk: string | null;
        tt: string | null;
        ins: string | null;
        offical: string | null;
    };
};
