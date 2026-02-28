import { useMutation } from "@tanstack/react-query";
import { signInWithGoogle } from "../services/auth";

function useSignInWithGoogle() {
  const query = useMutation({
    mutationKey: ["signInWithGoogle"],
    mutationFn: () => signInWithGoogle(),
  });

  return query;
}

export default useSignInWithGoogle;
