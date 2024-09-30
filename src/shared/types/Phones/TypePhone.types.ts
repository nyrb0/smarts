export interface IphoneArr {
    iphone: Phone[];
}
export interface PopularArr {
    phone: Phone[];
}

export interface Phone {
    id: string;
    name: string;
    image: Image;
    level: number;
    isImproved: number;
    price: Price;
    processor: string;
    camera: string;
    weigth: number;
    battery: number;
    ios?: any;
    screen: string;
    android: string;
    review?: ReviewCount[];
    comments: Comments[];
}

export interface Image {
    url: string;
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
}
export interface Date {
    month: number;
    day: number;
    year: number;
    hours: number;
    minutes: number;
    second: number;
}
