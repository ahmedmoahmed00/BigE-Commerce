import { useMutation } from "@tanstack/react-query";
import { signUpWithEmail } from "../services/auth";
import type { signUpProps } from "../types";
import { toast } from "sonner";

function useSignUpWithEmail() {
  const query = useMutation({
    mutationKey: ["signUpWithEmail"],
    mutationFn: ({ fullName, email, password }: signUpProps) =>
      signUpWithEmail({ fullName, email, password }),
    onSuccess: (data) => {
      const isExistingUser = data?.user?.identities?.length === 0;

      if (isExistingUser) {
        toast.error("Account already exists!", {
          description:
            "This email is already registered. Please sign in instead.",
        });
      } else {
        toast.success("Check your inbox! 🎉", {
          description: "We've sent a confirmation link to your email.",
        });
      }
    },

    onError: (error) => {
      const errorMessage = error.message?.includes("already registered")
        ? "This email is already in use. Try logging in instead!"
        : error.message || "Something went wrong. Please try again later.";

      toast.error("Signup Failed", {
        description: errorMessage,
      });
    },
  });

  return query;
}

export default useSignUpWithEmail;
