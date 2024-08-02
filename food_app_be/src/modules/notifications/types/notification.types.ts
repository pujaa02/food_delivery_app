export interface Ordermodal {
    menu_id: number;
    count: number;
    item_name: string;
    resta_id: number;
    restaurant: string;
    restaurant_address: string;
    restaurant_phone: string;
}

export interface OrderData {
    menu_id: number;
    total_item: number;
    menu: {
        restaurant_id: number;
        item_name: string;
        restaurant: {
            address: string;
            phone: string;
            name: string;
        };
    };
}

export interface DriverNotification {
    id: number;
    order_id: number;
    driver_id: number;
    message: string;
    isRead: boolean;
    isDeleted: boolean;
    createdAt: Date;
    deletedAt: Date | null;
    order: {
        user_id: number;
        address: string;
        phone: string;
    };
}