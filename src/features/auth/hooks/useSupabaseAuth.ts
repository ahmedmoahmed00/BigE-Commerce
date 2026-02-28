import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";
import { supabase } from "../../../shared/services/supabase";
import { useEffect } from "react";

export const useSupabaseAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
      if (event === "SIGNED_OUT") {
        queryClient.setQueryData(["user"], null);
        queryClient.clear();
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  const isAdmin = !!user?.admin;
  const isAuthenticated = user?.role === "authenticated";

  return { user, isLoading, isAdmin, isAuthenticated };
};
