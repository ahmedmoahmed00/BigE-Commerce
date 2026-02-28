import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../services/admin.api";
import type { UpdateProductPayload } from "../../types";
import { toast } from "sonner";

function useCreateProduct() {
  const query = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: ({ product }: { product: UpdateProductPayload }) =>
      createProduct({ product }),
    onSuccess: () => {
      toast.success("Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useCreateProduct;
