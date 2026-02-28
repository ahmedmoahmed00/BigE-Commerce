import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../../services/admin.api";
import type { CategoryPayload } from "../../types";
import { toast } from "sonner";

function useUpdateCategory() {
  const query = useMutation({
    mutationKey: ["updatedCategory"],
    mutationFn: ({ category }: { category: CategoryPayload }) =>
      updateCategory({ category }),
    onSuccess: () => {
      toast.success("Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useUpdateCategory;
