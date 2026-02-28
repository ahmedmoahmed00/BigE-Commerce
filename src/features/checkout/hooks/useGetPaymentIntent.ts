import { useQuery } from "@tanstack/react-query";
import { fetchPaymentIntent } from "../services/payment";

function useGetPaymentIntent(totalPriceCart: number) {
  const query = useQuery({
    queryKey: ["paymentIntent"],
    queryFn: () => fetchPaymentIntent(totalPriceCart),
    enabled: totalPriceCart > 0,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return query;
}

export default useGetPaymentIntent;
