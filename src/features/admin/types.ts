export type StatsType = {
  total_revenue: number;
  total_orders: number;
  total_products: number;
  total_users: number;
};

export type OrderDetailsType = {
  order_id: string;
  customer_name: string;
  items_count: number;
  total_price: number;
  status: string;
  order_date: string;
  total_count: number;
};

export interface ProductDetailsType {
  data: ProductDetails[];
  count: number;
}

export interface ProductDetails {
  id: string;
  image_url: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Option {
  id: string;
  value: string | number;
  label: string;
}

export interface UpdateProductPayload {
  id: string;
  productName: string;
  description: string;
  price: number | string;
  stock: number | string;
  categoryId: string | number;
  categorySlug: string;
  productImage: string;
  productFile?: File;
}

export interface CategoryPayload {
  id: string;
  categoryName: string;
  categorySlug: string;
  categoryImage: string;
  categoryFile?: File;
}

export interface CategoriesFetchResult {
  data: CategoryDetails[];
  count: number;
}

export interface CategoryDetails {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  created_at: string;
  products: Product[];
}

interface Product {
  count: number;
}

export interface OrderStatus {
  id: string;
  name: string;
  display_name: string;
  color: string;
  created_at?: string;
}

export interface User {
  name: string;
  email: string;
}

export interface OrderDetailStatus {
  id: string;
  name: string;
  color: string;
}

export interface OrderItemCount {
  count: number;
}

export interface OrderType {
  id: string;
  user_id: string;
  total_price: number;
  address: string;
  status_id: string;
  created_at: string;
  updated_at: string;
  users: User;
  order_statuses: OrderDetailStatus;
  order_items: OrderItemCount[];
}

export interface OrderDetails {
  id: string;
  address: string;
  total_price: number;
  created_at: string;

  users: {
    name: string;
    email: string;
  };

  order_statuses: {
    display_name: string;
    color: string;
  };

  order_items: {
    id: string;
    quantity: number;
    price: number;
    products: {
      name: string;
      image_url: string;
    };
  }[];
}

export type UserRow = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  avatar_url: string;
  created_at: string;
  address: string;
};

export interface UsersResponse {
  data: UserRow[];
  count: number;
}
