export interface IphoneArr {
    iphone: Iphone[];
}

export interface Iphone {
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
    ios: any;
    screen: string;
}

export interface Image {
    url: string;
}

export interface Price {
    rub: number;
    usd: number;
    som: number;
}
