export interface UserData {
    id: number,
    fname: string,
    lname: string,
    email: string,
    role_id: number
}

export interface RestaurantData {
    id: number;
    user_id: number;
    name: string;
    phone: number;
}

export interface MenuData {
    id: number;
    restaurant_id: number;
    item_name: string;
    price: number;
}

export interface RatingData {
    id: number;
    user_id: number;
    menu_id: number;
    content: string;
    rating: number;
}