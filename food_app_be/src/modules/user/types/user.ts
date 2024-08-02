export interface UserAttributes {
    id?: number;
    fname?: string;
    lname?: string | null;
    email?: string;
    phone?: string;
    gender?: string;
    bd?: Date;
    password?: string | null;
    access_key?: string | null;
    role_id?: number;
    city?: string;
    state?: string;
    street?: string;
    pincode?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export interface Payload {
    user_id: number;
    email: string;
    name: string;
    role_id: number;
}
