export interface MenuAttributes {
    id: number;
    restaurant_id: number;
    item_name?: string;
    image?: File;
    price: number;
    count: number;
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
    count: number;
    restaurant_id: number;
}