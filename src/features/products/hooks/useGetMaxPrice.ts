import { useQuery } from "@tanstack/react-query";
import { getMaxPrice } from "../services/products.api";

function useGetMaxPrice() {
  const query = useQuery({
    queryKey: ["maxPrice"],
    queryFn: () => getMaxPrice(),
  });

  return query;
}

export default useGetMaxPrice;
