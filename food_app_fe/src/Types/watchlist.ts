export interface CartAttribute {
    id?: number;
    user_id: number;
    menu_id: number;
    price: number
    count: number;
    item_name: string
    createdAt?: Date;
    updatedAt?: Date;
}
