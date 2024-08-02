export interface CartAttribute {
    id?: number;
    user_id: number;
    menu_id: number;
    count: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface Cartdata {
    id: number;
    user_id: number;
    menu_id: number;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export interface CartBody {
    id: number;
    user_id: number;
    menu_id: number;
    count: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    restaurant_id: number;
    item_name: string;
    description: string;
    price: number;
    image: string;
}