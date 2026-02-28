import { useMutation } from "@tanstack/react-query";
import { signOut } from "../services/auth";

function useSignOut() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["signOut"],
    mutationFn: signOut,
  });

  return { mutate, isPending };
}

export default useSignOut;
