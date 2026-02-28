export interface OrderStatusType {
  color: string;
  display_name: string;
}

export interface Products {
  image_url: string;
  product_name: string;
}

export interface OrderItem {
  id: string;
  products: Products;
  quantity: number;
  price_at_purchase: number;
}

export interface OrderType {
  id: string;
  total_price: number;
  address: string;
  created_at: string;
  order_statuses: OrderStatusType;
  items: OrderItem[];
}

export type OrderHistoryType = OrderType[];
