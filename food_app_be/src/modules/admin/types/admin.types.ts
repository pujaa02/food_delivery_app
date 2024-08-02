import { Prisma } from "@prisma/client";


export interface Restaurant {
    id: number;
    name: string;
    phone: string;
    user_id: number;
    deletedAt: Date | null;
};

export interface SearchConditionRestaurant {
    name?: Prisma.StringFilter;
    phone?: Prisma.StringFilter;
    user_id?: number;
}

export interface User {
    id: number;
    fname: string;
    lname: string | null;
    email: string;
    role_id: number;
    deletedAt: Date | null;
}

export interface SearchConditionUser {
    fname?: Prisma.StringFilter;
    lname?: Prisma.StringFilter;
    email?: Prisma.StringFilter;
    role_id?: number;
}

export interface Menu {
    id: number;
    restaurant_id: number;
    item_name: string;
    price: number;
}

export interface SearchConditionMenu {
    restaurant_id?: number;
    item_name?: Prisma.StringFilter;
    price?: number;
}

export interface Rating {
    id: number;
    user_id: number;
    menu_id: number;
    content: string | null;
    rating: number;
}

export interface SearchConditionRating {
    user_id?: number;
    menu_id?: number;
    content?: Prisma.StringFilter;
    rating?: number;
}