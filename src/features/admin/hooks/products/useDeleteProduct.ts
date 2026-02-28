import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../services/admin.api";
import { toast } from "sonner";

function useDeleteProduct() {
  const query = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: ({ productId }: { productId: string | number }) =>
      deleteProduct(productId),
    onSuccess: () => {
      toast.success("Deleted Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useDeleteProduct;
