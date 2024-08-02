export interface RestaurantAttributes {
  id?: number;
  user_id?: number;
  name?: string;
  phone?: string;
  image?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RestaurantResult {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}