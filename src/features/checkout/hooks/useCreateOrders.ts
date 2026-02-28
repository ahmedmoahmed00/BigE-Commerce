import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orders";
import type { CartItemProps } from "../../cart/types";

function useCreateOrders() {
  const query = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: ({
      userID,
      products,
      address,
      totalPrice,
    }: {
      userID: string;
      products: CartItemProps[];
      address: string;
      totalPrice: number;
    }) => createOrder({ userID, products, address, totalPrice }),
  });

  return query;
}

export default useCreateOrders;
