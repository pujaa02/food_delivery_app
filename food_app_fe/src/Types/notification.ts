export interface NotificationData {
    id: number;
    driver_id: number;
    order_id: number;
    message: string;
    isRead: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    order: { user_id: number, address: string, phone: string }
}