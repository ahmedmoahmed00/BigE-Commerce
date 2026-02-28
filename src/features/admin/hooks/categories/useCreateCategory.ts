import { useMutation } from "@tanstack/react-query";
import type { CategoryPayload } from "../../types";
import { createCategory } from "../../services/admin.api";
import { toast } from "sonner";

function useCreateCategory() {
  const query = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: ({ category }: { category: CategoryPayload }) =>
      createCategory({ category }),
    onSuccess: () => {
      toast.success("Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return query;
}

export default useCreateCategory;
