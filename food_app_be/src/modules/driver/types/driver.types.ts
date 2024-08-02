export interface DriverAttributes {
  id?: number;
  user_id?: number;
}

export interface DashboardData {
  id: number;
  order_id: number;
  driver_id: number;
  delivery_status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}