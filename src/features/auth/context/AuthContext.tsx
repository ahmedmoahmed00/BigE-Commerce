import { createContext } from "react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import type { AuthContextType } from "../types";
// import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isAuthenticated, isLoading, user } = useSupabaseAuth();

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
