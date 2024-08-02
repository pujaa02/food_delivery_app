export interface OrderAttributes {
  id?: number;
  user_id?: number;
  menu_id?: number;
  total_item?: number,
  createdAt?: Date;
  updatedAt?: Date;
}


export interface State_cart {
  cart: Menu[],
  total: number;
  totalItems: number;
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

export interface Order {
  id: number;
  user_id: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface orderStatus {
  id?: number | undefined;
  order_id: number;
  driver_id?: number | undefined;
  delivery_status?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  deletedAt?: Date | undefined | null;
  total_amount: number;
  item_name: string;
  date: Date;
}