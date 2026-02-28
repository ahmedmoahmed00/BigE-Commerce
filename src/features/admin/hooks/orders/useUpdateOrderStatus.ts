import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "../../services/admin.api";
import { toast } from "sonner";

function useUpdateOrderStatus() {
  const query = useMutation({
    mutationKey: ["updateOrderStatus"],
    mutationFn: (
      updates: {
        id: string;
        status_id: string;
      }[],
    ) => updateOrderStatus(updates),

    onSuccess: () => {
      toast.success("Update Successfully");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  return query;
}

export default useUpdateOrderStatus;
