export interface IphoneArr {
    iphone: Phone[];
}
export interface PopularArr {
    phone: Phone[];
}

export interface Phone {
    id: number;
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
}

export interface Image {
    url: string;
}

export interface Price {
    rub: number;
    usd: number;
    som: number;
}