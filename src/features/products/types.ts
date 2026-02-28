export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  category_id: string;
  created_at: string;
  total_count: number;
}
export interface ProductFilterParams {
  limit: number;
  page: number;
  category?: string | null;
  search?: string | null;
  maxPrice?: number | null;
  sortBy: "price" | "created_at" | "name";
  sortOrder: "asc" | "desc";
}
