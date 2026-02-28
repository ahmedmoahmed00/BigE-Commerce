import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "../../services/admin.api";

function useGetOrderStatus() {
  const query = useQuery({
    queryKey: ["orderStatus"],
    queryFn: () => getOrderStatus(),
  });

  return query;
}

export default useGetOrderStatus;
