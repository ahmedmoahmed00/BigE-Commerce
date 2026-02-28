import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/user.api";
import { toast } from "sonner";

function useUpdateUser() {
  const query = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: ({ userID, address }: { userID: string; address: string }) =>
      updateUser({ userID, address }),
    onSuccess: () => {
      toast.success("Address updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update address. Please try again.");
    },
  });

  return query;
}

export default useUpdateUser;
