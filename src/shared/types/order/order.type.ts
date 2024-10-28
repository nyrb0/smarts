export type usersOrder = {
    id: string;
    number: string;
    title: string;
    place: UsersOrderPlace;
    orderLocation: boolean;
};

export type UsersOrderPlace = {
    region: string;
    city: string;
    street: string;
    addressNumber: string;
};
