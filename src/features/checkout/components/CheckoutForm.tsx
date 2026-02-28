import { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { STRIPE_ELEMENT_OPTIONS } from "../styles";
import Input from "../../auth/components/Input";
import { useConfirmPayment } from "../hooks/useConfirmPayment";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX } from "../../../shared/config/validation";
import ShowMessageError from "../../../shared/components/ui/ShowMessageError";
import useAuth from "../../auth/hooks/useAuthContext";
import InputAddress from "../../../shared/components/ui/InputAddress";
import useCreateOrders from "../hooks/useCreateOrders";
import { useCart } from "../../cart/hooks/useCart";
import { toast } from "sonner";

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const navigate = useNavigate();
  const { totalPriceCart, cart, clearCart } = useCart();

  const TAX = totalPriceCart * 0.08;
  const orderTotal = TAX + totalPriceCart;
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  const [messageError, setMessageError] = useState<string>("");

  const {
    data: orderDetails,
    isSuccess,
    mutate: createOrders,
    isPending: isPendingCreateOrder,
  } = useCreateOrders();
  const { mutate: confirmPayment, isPending } = useConfirmPayment();
  const { fullName, email, address } = formData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName.length < 10) {
      setMessageError("Please enter your full name (at least 10 characters).");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setMessageError("Please enter a valid email address.");
      return;
    }

    if (address.length < 10) {
      setMessageError("Please enter a valid address (at least 10 characters).");
      return;
    }

    setMessageError("");
    handelConfirmPayment();
  };

  const handelConfirmPayment = () => {
    confirmPayment(
      {
        clientSecret,
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
      },
      {
        onSuccess: (paymentIntent) => {
          if (paymentIntent?.status === "succeeded") {
            if (!user?.id) {
              toast.error("Please login to place an order");
              return;
            }
            {
              createOrders({
                userID: user?.id,
                products: cart,
                address: address,
                totalPrice: orderTotal,
              });
            }
          }
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  useEffect(() => {
    if (isSuccess && orderDetails) {
      navigate("/success", {
        state: { fromCheckout: true, orderDetails, ordersItems: cart },

        replace: true,
      });

      clearCart();
    }
  }, [isSuccess, orderDetails, cart, navigate, clearCart]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
      <header>
        <h2 className="font-semibold mb-6 text-gray-900">
          Shipping Information
        </h2>
      </header>
      <div>
        {messageError && <ShowMessageError messageError={messageError} />}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" dir="ltr">
        <div>
          <Input
            showIcon={false}
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            setValue={(val) => setFormData({ ...formData, fullName: val })}
          />
        </div>
        <div>
          <Input
            showIcon={false}
            label="Email Address"
            value={formData.email}
            placeholder="you@example.com"
            setValue={(val) => setFormData({ ...formData, email: val })}
          />
        </div>
        <div>
          <InputAddress
            label="Address"
            placeholder="123 Main Street"
            value={formData.address}
            setValue={(val) => setFormData({ ...formData, address: val })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="p-3 bg-white rounded-lg border border-gray-300  focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <CardNumberElement options={STRIPE_ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="p-3 bg-white rounded-lg border border-gray-300  focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <CardExpiryElement
                options={{
                  ...STRIPE_ELEMENT_OPTIONS,
                  placeholder: "MM / YY",
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <div className="p-3 bg-white rounded-lg border border-gray-300  focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
              <CardCvcElement options={STRIPE_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        <button
          disabled={isPending || isPendingCreateOrder}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-bold text-white disabled:opacity-50 transition-colors"
        >
          {isPending || isPendingCreateOrder ? "Processing..." : "Pay now"}
        </button>
      </form>
    </div>
  );
}
