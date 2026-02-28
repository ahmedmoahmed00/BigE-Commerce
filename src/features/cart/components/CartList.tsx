import { useCart } from "../hooks/useCart";
import CartItem from "./CartItem";

function CartList() {
  const { cart, clearCart } = useCart();

  return (
    <div className="">
      {cart.map((item, index) => (
        <CartItem item={item} key={item.id + index} />
      ))}
      <div className="p-6">
        <button
          onClick={() => clearCart()}
          className="text-sm text-red-600 hover:text-red-700 cursor-pointer"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartList;
