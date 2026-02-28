import type { Dispatch, SetStateAction } from "react";
import type { Product } from "../products/types";

export type CartItemProps = Product & {
  quantityInCart: number;
};
export interface CartContextType {
  cart: CartItemProps[];
  setCart: Dispatch<SetStateAction<CartItemProps[]>>;
  quantityAllItems: number;
  totalPriceCart: number;
  isEmptyCart: boolean;
  addItemToCart: (item: Omit<CartItemProps, "quantity">) => void;
  checkItemInCart: (id: string | number) => boolean;
  incrementQuantity: (id: string | number) => void;
  decrementQuantity: (id: string | number) => void;
  removeItemFromCart: (id: string | number) => void;
  clearCart: () => void;
}
