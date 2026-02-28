import type { Stripe, StripeElements } from "@stripe/stripe-js";
import { supabase } from "../../../shared/services/supabase";
import { CardNumberElement } from "@stripe/react-stripe-js";

const SENTS = 100;

interface ConfirmPaymentParams {
  stripe: Stripe | null;
  elements: StripeElements | null;
  clientSecret: string;
  fullName: string;
  email: string;
  address: string;
}

export const fetchPaymentIntent = async (totalPriceCart: number) => {
  if (!totalPriceCart || totalPriceCart <= 0) return null;

  const { data, error } = await supabase.functions.invoke(
    "create-payment-intent",
    {
      body: { amount: parseInt((totalPriceCart * SENTS).toFixed(0)) },
    },
  );

  if (error) {
    throw new Error(error.message || "Failed to fetch payment intent");
  }

  return data?.clientSecret as string;
};

export const confirmStripePayment = async ({
  stripe,
  elements,
  clientSecret,
  fullName,
  email,
  address,
}: ConfirmPaymentParams) => {
  if (!stripe || !elements) throw new Error("Stripe has not loaded yet.");

  const cardElement = elements.getElement(CardNumberElement);

  if (!cardElement) throw new Error("Card element not found.");

  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: fullName,
          email: email,
          address: { line1: address },
        },
      },
    },
  );

  if (error) throw new Error(error.message);

  return paymentIntent;
};
