import { useQuery } from "@tanstack/react-query";
import { orderDetails } from "../../services/admin.api";

function useGetOrderDetails(orderId: string) {
  const qury = useQuery({
    queryKey: ["orderDetailss", orderId],
    queryFn: () => orderDetails(orderId),
    enabled: !!orderId,
  });

  return qury;
}

export default useGetOrderDetails;
