import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import type { CartItemProps } from "../types";
import { formatCurrency } from "../../../shared/utils/helpers";
import { useCart } from "../hooks/useCart";

function CartItem({ item }: { item: CartItemProps }) {
  const { removeItemFromCart, decrementQuantity, incrementQuantity } =
    useCart();
  const totalPrice = item.quantityInCart * item.price;

  const handelDecrementQuantity = () => {
    if (item.quantityInCart !== 1) decrementQuantity(item.id);
    else removeItemFromCart(item.id);
  };

  return (
    <div className="flex flex-col  md:flex-row gap-4 p-6 border-b border-gray-200 last:border-b-0">
      <Link
        to={`products`}
        className="md:w-24 md:h-24  rounded-lg overflow-hidden bg-gray-100"
      >
        <img
          className="w-full h-full object-cover"
          src={item.image_url}
          alt={item.name}
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            className="font-medium hover:text-secondary mb-1"
            to={`products`}
          >
            {item.name}
          </Link>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="font-semibold mt-4 ">
          <span>{formatCurrency(item.price)}</span>
        </div>
      </div>
      <div className="flex flex-row items-center md:flex-col md:items-end justify-between">
        <div>
          <button
            onClick={() => removeItemFromCart(item.id)}
            aria-label="Remove item in cart"
            className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
          >
            <FaRegTrashAlt />
          </button>
        </div>
        <div className="flex items-center h-9 w-32 gap-2 border rounded-lg border-gray-300 overflow-hidden">
          <button
            aria-label="Decrement quantity"
            onClick={handelDecrementQuantity}
            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaMinus />
          </button>
          <span className="w-12 text-center font-medium overflow-x-auto">
            {item.quantityInCart}
          </span>
          <button
            aria-label="Increment quantity"
            onClick={() => incrementQuantity(item.id)}
            disabled={item.quantityInCart === item.stock_quantity}
            className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
        <div>
          <span className="font-semibold ">{formatCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
