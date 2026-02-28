import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-12 text-center">
        <div className="mb-4 ">
          <FiShoppingCart className="text-center mx-auto size-16 text-gray-300" />
        </div>
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to={"/products"}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
