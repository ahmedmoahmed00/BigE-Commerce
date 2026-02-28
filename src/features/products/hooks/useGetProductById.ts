import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/products.api";

function useGetProductById({ productId }: { productId: string }) {
  const query = useQuery({
    queryKey: ["productById", productId],
    queryFn: async () => getProductById(productId),
  });

  return query;
}
export default useGetProductById;
