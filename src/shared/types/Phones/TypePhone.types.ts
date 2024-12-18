export interface IphoneArr {
    iphone: Phone[];
}
export interface PopularArr {
    phone: Phone[];
}

export interface Phone {
    id: string;
    name: string;
    channel: PhoneChannel;
    image: Image;
    level: number;
    isImproved: number;
    price: Price;
    processor: string;
    camera: string;
    weigth: number;
    battery: number;
    ios?: any;
    desc: string;
    screen: string;
    android: string;
    review?: ReviewCount[];
    selected: {
        color: string;
        storage: string;
    };
    comments: Comments[];
}

export interface PhoneChannel {
    id: string;
}

export interface Image {
    url: string;
    gold: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
    };
    black: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
    };
    gray: {
        '1': string;
        '2': string;
        '3': string;
        '4': string;
    };
}

export interface Price {
    rub: number;
    usd: number;
    som: number;
}

export interface ReviewCount {
    category: string;
    votes: number;
}
export interface Comments {
    id: string;
    user: string | null;
    comment: string;
    votesStars: number;
    date: Date;
    photos?: Photos[];
}

export interface Photos {
    id: string;
    img: string;
}
export interface Date {
    month: number;
    day: number;
    year: number;
    hours: number;
    minutes: number;
    second: number;
}
