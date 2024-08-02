export interface order {
    id?: number | undefined;
    order_id: number;
    driver_id?: number | undefined;
    delivery_status?: string | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    deletedAt?: Date | undefined;
    total_amount: number;
    item_name: string;
    date: Date;
}

export interface Ordermodal {
    menu_id: number;
    count: number;
    item_name: string;
    resta_id: number;
    restaurant: string;
    restaurant_address: string;
    restaurant_phone: string;
}
