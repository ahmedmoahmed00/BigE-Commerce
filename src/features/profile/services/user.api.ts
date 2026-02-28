import { supabase } from "../../../shared/services/supabase";

export async function updateUser({
  userID,
  address,
}: {
  userID: string;
  address: string;
}) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ address: address })
      .eq("id", userID)
      .select();

    if (error) {
      console.error("Error Create Orders:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error in createOrders:", error);
  }
}
