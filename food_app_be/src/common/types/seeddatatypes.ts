export interface User {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    gender: string;
    bd: Date;
    password: string;
    role_id: number;
    city: string;
    state: string;
    street: string;
    pincode: string;
}

export interface Restaurant {
    name: string;
    user_id: number;
    address: string;
    phone: string;
    image: string;
}

export interface Menu {
    restaurant_id: number;
    item_name: string;
    price: number;
    image: string;
}

export interface Driver {
    user_id: number;
}

export interface Rating {
    user_id: number;
    menu_id: number;
    content: string;
    rating: number;
}