import CartList from "../features/cart/components/CartList";
import CartSummary from "../features/cart/components/CartSummary";
import EmptyCart from "../features/cart/components/EmptyCart";
import { useCart } from "../features/cart/hooks/useCart";

function Cart() {
  const { isEmptyCart } = useCart();

  if (isEmptyCart) {
    return <EmptyCart />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <h1 className="mb-8 text-xl font-semibold">Shopping Cart</h1>
      </header>
      <div className="flex items-start lg:flex-row flex-col  gap-8">
        <div className="g-white rounded-2xl overflow-hidden shadow-sm flex-1">
          <CartList />
        </div>
        <div className="bg-primary rounded-2xl p-6 shadow-sm lg:w-120 w-full sticky top-24">
          <CartSummary message="🎉 You've qualified for free shipping!" />
        </div>
      </div>
    </div>
  );
}

export default Cart;
