import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/auth";
import type { loginProps } from "../types";
import { toast } from "sonner";

function useLogin() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ["signUpWithNormalEmail"],
    mutationFn: ({ email, password }: loginProps) => login({ email, password }),
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.name}! 👋`, {
        description: "Signed in successfully.",
      });

      queryClient.setQueryData(["user"], data);
    },

    onError: (error) => {
      toast.error("Login failed", {
        description: error.message || "Invalid email or password.",
      });
    },
  });

  return query;
}

export default useLogin;
