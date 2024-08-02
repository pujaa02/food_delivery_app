export interface ChatAttributes {
    id?: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}