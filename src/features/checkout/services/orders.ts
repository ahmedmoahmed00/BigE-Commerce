import { supabase } from "../../../shared/services/supabase";
import type { CartItemProps } from "../../cart/types";
import type { OrderHistoryType } from "../types";

export async function createOrder({
  userID,
  products,
  address,
  totalPrice,
}: {
  userID: string;
  products: CartItemProps[];
  address: string;
  totalPrice: number;
}) {
  try {
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id: userID, total_price: totalPrice, address }])
      .select()
      .single();

    if (orderError) {
      console.error("Error Create Orders:", orderError.message);
      throw orderError;
    }

    if (order) {
      const orderItems = products.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantityInCart,
        price: item.price,
      }));

      const { error } = await supabase.from("order_items").insert(orderItems);

      if (error) {
        console.error("Error Create Orders:", error.message);
        throw orderError;
      }

      return order;
    }
  } catch (error) {
    console.error("Unexpected error in createOrders:", error);
  }
}

export async function ordersHistory(
  userID: string,
): Promise<OrderHistoryType | null> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `id,total_price,address, created_at, order_statuses(display_name, color), items:order_items(id, quantity, price_at_purchase:price, products(product_name:name,image_url))`,
      )
      .eq("user_id", userID)
      .range(0, 9);

    if (error) {
      console.error("Error fetching history:", error);
      throw error;
    }

    console.log(data);

    return (data as unknown as OrderHistoryType) || [];
  } catch (error) {
    console.error("Unexpected error in ordersHistory:", error);
    return null;
  }
}
