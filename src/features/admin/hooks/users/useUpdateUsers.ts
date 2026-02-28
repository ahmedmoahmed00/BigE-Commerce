import { useMutation } from "@tanstack/react-query";
import { updateUserRole } from "../../services/admin.api";
import { toast } from "sonner";

function useUpdateUsers() {
  const query = useMutation({
    mutationKey: ["updateUsers"],
    mutationFn: (
      updates: {
        id: string;
        role: string;
      }[],
    ) => updateUserRole(updates),

    onSuccess: () => {
      toast.success("Update Successfully");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  return query;
}

export default useUpdateUsers;
