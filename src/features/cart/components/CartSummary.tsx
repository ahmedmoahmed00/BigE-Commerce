import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../../../shared/utils/helpers";

const SHIPPING = 0;

function CartSummary({
  removeButtons = false,
  message,
}: {
  removeButtons?: boolean;
  message: string;
}) {
  const { totalPriceCart } = useCart();

  const TAX = totalPriceCart * 0.08;
  const orderTotal = SHIPPING + TAX + totalPriceCart;

  return (
    <div>
      <header>
        <h2 className="font-semibold mb-6">Order Summary</h2>
      </header>
      <div>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(totalPriceCart)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>{formatCurrency(SHIPPING)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{formatCurrency(TAX)}</span>
          </div>
          <div className="border-t border-t-gray-200 pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatCurrency(orderTotal)}</span>
          </div>
        </div>
        {!removeButtons && (
          <div>
            <div>
              <Link
                to={"/checkout"}
                className="block w-full  bg-secondary text-primary py-3 text-center rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </Link>
            </div>
            <div>
              <Link
                className="block w-full text-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                to="/products"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center">
          {message}
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
