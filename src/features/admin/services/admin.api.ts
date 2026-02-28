import { supabase } from "../../../shared/services/supabase";
import { PAGE_SIZE } from "../../../shared/utils/constants";
import type {
  CategoriesFetchResult,
  CategoryDetails,
  OrderDetailsType,
  ProductDetails,
  ProductDetailsType,
  StatsType,
  CategoryPayload,
  UpdateProductPayload,
  OrderStatus,
  OrderType,
  OrderDetails,
  UserRow,
  UsersResponse,
} from "../types";

export async function getStats() {
  try {
    const { data, error } = await supabase.rpc("get_dashboard_stats");

    if (error) {
      console.error("Error fetching Stats:", error);
      throw error;
    }

    return (data[0] as StatsType) || [];
  } catch (error) {
    console.error("Unexpected error in Stats:", error);
    return null;
  }
}

type FilterType = {
  page: number;
  searchQuery?: string;
  statusName?: string;
};

export async function getOrderDetails({ page }: FilterType) {
  try {
    const from = (page - 1) * PAGE_SIZE;

    const { data, error } = await supabase.rpc(
      "get_admin_orders_details_paginated",
      {
        page_limit: PAGE_SIZE,
        page_offset: from,
      },
    );

    if (error) {
      console.error("Error fetching ordersDetails:", error);
      throw error;
    }

    return (data as OrderDetailsType[]) || [];
  } catch (error) {
    console.error("Unexpected error in ordersDetails:", error);
    return null;
  }
}

export async function getProductsDetails({
  page,
  searchQuery,
}: FilterType): Promise<ProductDetailsType> {
  try {
    let query = supabase
      .from("products")
      .select(
        "id, image_url, name, description, price, stock_quantity, category:categories(id,name,slug)",
        { count: "exact" },
      );

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`,
      );
    }

    query = query.order("id", { ascending: false });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }
    const { data, error, count } = await query;

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Products could not be loaded");
    }

    return {
      data: (data as unknown as ProductDetails[]) || [],
      count: count || 0,
    };
  } catch (error) {
    console.error("Unexpected error in getProductsDetails:", error);

    return {
      data: [],
      count: 0,
    };
  }
}

export async function updateProduct({
  product,
}: {
  product: UpdateProductPayload;
}) {
  const {
    id,
    categoryId: category_id,
    productImage,
    stock: stock_quantity,
    price,
    productFile,
    productName: name,
    description,
  } = product;

  try {
    let image_url = productImage;

    if (productFile) {
      const fileName = `${Date.now()}-${productFile.name}`;

      image_url =
        (await updateFile({
          bucketName: "products-images",
          filePath: fileName,
          newFileBody: productFile,
        })) || productImage;
    }

    const productPayload = {
      category_id,
      image_url,
      stock_quantity,
      price,
      name,
      description,
    };
    const { data, error } = await supabase
      .from("products")
      .update(productPayload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Products could not be Updated");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in UpdateProduct:", error);
  }
}

export async function createProduct({
  product,
}: {
  product: UpdateProductPayload;
}) {
  const {
    categoryId: category_id,
    stock: stock_quantity,
    price,
    productName: name,
    description,
    productFile,
  } = product;

  if (productFile === undefined) {
    return;
  }

  const image_url = await uploadFile("products-images", productFile);

  const productPayload = {
    category_id,
    image_url,
    stock_quantity,
    price,
    name,
    description,
  };

  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productPayload])
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Products could not be Created");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in CreateProduct:", error);
  }
}

export async function deleteProduct(productId: string | number) {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId)
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Products could not be Deleted");
    }

    deleteFileIn("products-images", data[0].image_url);

    return data;
  } catch (error) {
    console.error("Unexpected error in DeleteProduct:", error);
  }
}

async function uploadFile(bucketName: string, file: File) {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return data.publicUrl || "";
}

async function updateFile({
  bucketName,
  filePath,
  newFileBody,
}: {
  bucketName: string;
  filePath: string;
  newFileBody: File;
}) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .update(filePath, newFileBody, {
      upsert: true,
    });

  if (error) {
    console.error("Error updating file:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
async function deleteFileIn(bucketName: string, fileUrl: string) {
  const filePath = fileUrl.split("/").pop();

  if (!filePath) return;

  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    console.error("Bucket Error:", error.message);
  }
}

export async function getCategoriesDetails({
  page,
  searchQuery,
}: FilterType): Promise<CategoriesFetchResult> {
  try {
    let query = supabase
      .from("categories")
      .select("id,name,slug,image_url,created_at,products(count)", {
        count: "exact",
      });

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%`);
    }

    query = query.order("id", { ascending: false });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Categories could not be loaded");
    }

    return {
      data: (data as unknown as CategoryDetails[]) || [],
      count: count || 0,
    };
  } catch (error) {
    console.error("Unexpected error in getCategoriesDetails:", error);

    return {
      data: [],
      count: 0,
    };
  }
}

export async function updateCategory({
  category,
}: {
  category: CategoryPayload;
}) {
  const {
    id,
    categoryImage,
    categoryName: name,
    categorySlug: slug,
    categoryFile,
  } = category;

  try {
    let image_url = categoryImage;

    if (categoryFile) {
      const fileName = `${Date.now()}-${categoryFile.name}`;

      image_url =
        (await updateFile({
          bucketName: "products-images",
          filePath: fileName,
          newFileBody: categoryFile,
        })) || categoryImage;
    }

    const productPayload = {
      name,
      slug,
      image_url,
    };

    const { data, error } = await supabase
      .from("categories")
      .update(productPayload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Category could not be Updated");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in UpdateCategory:", error);
  }
}

export async function deleteCategory(categoryId: string | number) {
  try {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", categoryId)
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("categoryId could not be Deleted");
    }

    deleteFileIn("categories-images", data[0].image_url);

    return data;
  } catch (error) {
    console.error("Unexpected error in DeletecategoryId:", error);
  }
}

export async function createCategory({
  category,
}: {
  category: CategoryPayload;
}) {
  const { categoryFile, categoryName: name, categorySlug: slug } = category;

  let image_url: string | null = "";

  if (categoryFile !== undefined) {
    image_url = await uploadFile("categories-images", categoryFile);
  }

  const categoryPayload = { name, slug, image_url: image_url || "" };

  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([categoryPayload])
      .select();

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Category could not be Created");
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in Createcategory:", error);
  }
}

export async function getOrderStatus(): Promise<OrderStatus[]> {
  try {
    const { data, error } = await supabase
      .from("order_statuses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("OrderStatus could not be loaded");
    }

    return data || [];
  } catch (error) {
    console.error("Unexpected error in getOrderStatus:", error);
    return [];
  }
}

interface OrdersResponse {
  data: OrderType[];
  count: number;
}

export async function getAdminOrders({
  page,
  searchQuery,
  statusName,
}: FilterType): Promise<OrdersResponse> {
  try {
    let query = supabase
      .from("orders")
      .select(
        `*, users!inner(name, email),order_items(count), order_statuses!inner(id,name, color)`,
        { count: "exact" },
      );

    if (statusName && statusName !== "all") {
      query = query.eq("order_statuses.name", statusName);
    }

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%, email.ilike.%${searchQuery}%`,
        { referencedTable: "users" },
      );
    }

    query = query.order("created_at", { ascending: false });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Orders could not be loaded");
    }

    return {
      data: (data as unknown as OrderType[]) || [],
      count: count || 0,
    };
  } catch (error) {
    console.error("Unexpected error in getAdminOrders:", error);
    return { data: [], count: 0 };
  }
}

export async function updateOrderStatus(
  updates: { id: string; status_id: string }[],
) {
  try {
    const updatePromises = updates.map((item) =>
      supabase
        .from("orders")
        .update({ status_id: item.status_id })
        .eq("id", item.id),
    );

    const results = await Promise.all(updatePromises);

    const error = results.find((res) => res.error)?.error;

    if (error) throw error;

    return results.map((res) => res.data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("OrdersStatus could not be Updated");
  }
}

export async function orderDetails(orderId: string): Promise<OrderDetails[]> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "id,address,total_price,created_at,users(name,email),order_statuses(display_name,color),order_items(id,quantity,price,products(name,image_url))",
      )
      .eq("id", orderId);

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("OrderStatus could not be loaded");
    }

    return (data as unknown as OrderDetails[]) || [];
  } catch (error) {
    console.error("Unexpected error in getOrderStatus:", error);
    return [];
  }
}

export async function UsersDetails({
  searchQuery,
  page,
}: FilterType): Promise<UsersResponse> {
  try {
    let query = supabase.from("users").select("*", { count: "exact" });

    if (searchQuery) {
      query = query.or(
        `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`,
      );
    }

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Database Error:", error.message);
      throw new Error("Users could not be loaded");
    }

    return {
      data: (data as UserRow[]) || [],
      count: count || 0,
    };
  } catch (error) {
    console.error("Unexpected error in getUsersDetails:", error);
    throw error;
  }
}

export async function updateUserRole(updates: { id: string; role: string }[]) {
  try {
    const updatePromises = updates.map((user) =>
      supabase
        .from("users")
        .update({ admin: user.role === "admin" })
        .eq("id", user.id),
    );

    const results = await Promise.all(updatePromises);

    const error = results.find((res) => res.error)?.error;

    if (error) throw error;

    return results.map((res) => res.data);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("userRoles could not be Updated");
  }
}
