export interface RegData {
    id?: number
    fname?: string;
    lname?: string;
    email?: string;
    phone?: string;
    gender?: string;
    bd: Date | string;
    password?: string;
    role_id?: number;
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
