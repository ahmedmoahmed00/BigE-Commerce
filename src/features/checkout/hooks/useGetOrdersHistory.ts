import { useQuery } from "@tanstack/react-query";
import { ordersHistory } from "../services/orders";

function useGetOrdersHistory(userID: string) {
  const query = useQuery({
    queryKey: ["ordersHistory", userID],
    queryFn: () => ordersHistory(userID),
    enabled: !!userID,
  });

  return query;
}

export default useGetOrdersHistory;
