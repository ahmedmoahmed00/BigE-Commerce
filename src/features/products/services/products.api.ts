import { supabase } from "../../../shared/services/supabase";
import type { Product, ProductFilterParams } from "../types";

export async function getMaxPrice(): Promise<number> {
  try {
    const { data, error } = await supabase.rpc("get_max_price");

    if (error) {
      console.error("Error fetching max price:", error.message);
      throw error;
    }

    return (data as number) ?? 0;
  } catch (error) {
    console.error("Unexpected error:", error);
    return 0;
  }
}

export async function getProductsPaginated({
  limit,
  page,
  category,
  search,
  maxPrice,
  sortBy,
  sortOrder,
}: ProductFilterParams) {
  try {
    const { data, error } = await supabase.rpc("get_products_paginated", {
      page_limit: limit,
      page_offset: page,
      category_filter: category || null,
      search_text: search || null,
      max_price: maxPrice,
      sort_by: sortBy,
      sort_order: sortOrder,
    });

    if (error) {
      console.error("Error fetching max price:", error.message);
      throw error;
    }

    return data as Product[];
  } catch (error) {
    console.error("Unexpected error:", error);
    return 0;
  }
}

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      console.error("Error fetching product by ID:", error.message);
      throw error;
    }

    return data as Product | null;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
}
