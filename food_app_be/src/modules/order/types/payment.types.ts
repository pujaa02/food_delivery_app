export interface PaymentAttributes {
  id?: number;
  order_id?: number;
  payment_method?: string;
  total_amount?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}