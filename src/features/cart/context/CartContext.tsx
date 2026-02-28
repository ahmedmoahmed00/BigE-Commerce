import { createContext, type ReactNode } from "react";
import { useLocalStorageState } from "../../../shared/hooks/useLocalStorageState";
import type { CartContextType, CartItemProps } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useLocalStorageState<CartItemProps[]>([], "cart");

  const quantityAllItems = cart.reduce(
    (total, item) => total + item.quantityInCart,
    0,
  );

  const totalPriceCart = cart.reduce(
    (sum, item) => sum + item.quantityInCart * item.price,
    0,
  );

  const isEmptyCart = cart.length === 0;

  function checkItemInCart(id: string | number): boolean {
    return cart.some((item) => item.id === id);
  }

  function addItemToCart(item: Omit<CartItemProps, "quantity">) {
    if (!checkItemInCart(item.id)) {
      setCart((prevCart) => [...prevCart, { ...item }]);
    } else {
      incrementQuantity(item.id);
    }
  }

  function incrementQuantity(id: string | number) {
    setCart((cart) =>
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantityInCart + 1;
          if (item.stock_quantity >= newQuantity) {
            return { ...item, quantityInCart: newQuantity };
          } else {
            window.alert("Stock has reached its maximum limit");
            return item;
          }
        }
        return item;
      }),
    );
  }

  function decrementQuantity(id: string | number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantityInCart: Math.max(1, item.quantityInCart - 1),
            }
          : item,
      ),
    );
  }

  const clearCart = () => {
    setCart([]);
  };

  const removeItemFromCart = (id: string | number) => {
    setCart((cart) => cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        quantityAllItems,
        totalPriceCart,
        addItemToCart,
        checkItemInCart,
        decrementQuantity,
        incrementQuantity,
        clearCart,
        isEmptyCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContextProvider, CartContext };
