import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../features/checkout/components/CheckoutForm";
import { useCart } from "../features/cart/hooks/useCart";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useGetPaymentIntent from "../features/checkout/hooks/useGetPaymentIntent";
import Loader from "../shared/components/ui/Loader";
import CartSummary from "../features/cart/components/CartSummary";
import EmptyCart from "../features/cart/components/EmptyCart";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { totalPriceCart, isEmptyCart } = useCart();
  const { data: clientSecret, isLoading } = useGetPaymentIntent(totalPriceCart);

  if (isEmptyCart) {
    return <EmptyCart />;
  }

  if (isLoading) return <Loader />;

  if (!clientSecret) return <div>Error: Could not initialize payment.</div>;

  const stripeOptions = {
    clientSecret: clientSecret,
    locale: "en" as const,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header>
        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            to="/cart"
          >
            <FaArrowLeftLong />
            Back to Cart
          </Link>
        </div>
        <h1 className="mb-8">Checkout</h1>
      </header>
      <div className="flex items-start lg:flex-row flex-col  gap-8">
        {clientSecret ? (
          <Elements stripe={stripePromise} options={stripeOptions}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          <div className="text-center py-10">
            Loading the payment gateway...
          </div>
        )}
        <div className="bg-primary rounded-2xl p-6 shadow-sm lg:max-w-120 w-full sticky top-24">
          <CartSummary
            message="🎉 Free shipping applied!"
            removeButtons={true}
          />
        </div>
      </div>
    </div>
  );
}
