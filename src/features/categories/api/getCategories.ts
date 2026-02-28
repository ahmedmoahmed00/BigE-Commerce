import { supabase } from "../../../shared/services/supabase";
import type { Category, GetCategoriesParams } from "../types";

export async function getCategories(
  params?: GetCategoriesParams,
): Promise<Category[]> {
  try {
    let query = supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (params?.paginate) {
      const start = params.start ?? 0;
      const end = params.end ?? 4;
      query = query.range(start, end);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching categories:", error.message);
      throw error;
    }

    return (data as Category[]) ?? [];
  } catch (error) {
    console.error("Unexpected error in getCategories:", error);

    return [];
  }
}
