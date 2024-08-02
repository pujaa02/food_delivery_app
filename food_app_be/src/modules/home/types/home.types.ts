

export interface Menudata {
    id: number;
    item_name: string;
    price: number;
    image: string | null;
    restaurant: {
        id: number;
        user_id: number;
        name: string;
        image: string | null;
    };
}

export interface AvgRating {
    menu_id: number
    _avg: {
        rating: number | null;
    };
}

export interface Restaurant {
    id: number;
    user_id: number;
    name: string;
    image: string | null;
}
export interface MenuItem {
    id: number | null;
    item_name: string | null;
    price: number | null;
    image: string | null;
    restaurant: Restaurant;
    menu_id?: number | null;
    avgrate?: string | null;
}
export interface Rating {
    menu_id: number;
    avgrate: string | null;
}

export interface RestaurantRating {
    user_id: number;
    name: string;
    image: string | null;
    ratings: number[];
}

export interface RestaurantAverage {
    restaurant_id: number;
    user_id: number;
    restaurant_name: string;
    restaurant_image: string | null;
    average_rating: number | null;
}
export interface MenuData {
    menu_id?: number | undefined;
    avgrate?: string | null | undefined;
    id?: number;
    restaurant_id?: number;
    item_name: string;
    image?: string;
    description?: string;
    price?: number;
    count?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Menu {
    menu_id: number;
    avgrate?: string | null | undefined;
    item_name: string;
    price: number;
    image: string | null;
    name: string;
    count?: number;
    restaurant_id: number;
}