import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProduct } from "../../services/admin.api";
import type { UpdateProductPayload } from "../../types";

function useUpdateProduct() {
  const query = useMutation({
    mutationKey: ["updatedProduct"],
    mutationFn: ({ product }: { product: UpdateProductPayload }) =>
      updateProduct({ product }),
    onSuccess: () => {
      toast.success("Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useUpdateProduct;
