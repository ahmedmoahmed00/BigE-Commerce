import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../../services/admin.api";
import { toast } from "sonner";

function useDeleteCategory() {
  const query = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: ({ categoryId }: { categoryId: string | number }) =>
      deleteCategory(categoryId),
    onSuccess: () => {
      toast.success("Deleted Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useDeleteCategory;
