export interface ChatData {
    message: string;
    restaurant_id: number;
}

export interface ChatAttributes {
    id?: number;
    sender_id?: number;
    receiver_id: number;
    message: string;
    timestamp: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}