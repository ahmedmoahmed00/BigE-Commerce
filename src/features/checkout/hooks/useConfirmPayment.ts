import { useMutation } from "@tanstack/react-query";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { confirmStripePayment } from "../services/payment";

export const useConfirmPayment = () => {
  const stripe = useStripe();
  const elements = useElements();

  return useMutation({
    mutationKey: ["confirmPayment"],
    mutationFn: (params: {
      clientSecret: string;
      fullName: string;
      email: string;
      address: string;
    }) =>
      confirmStripePayment({
        stripe,
        elements,
        ...params,
      }),
  });
};
