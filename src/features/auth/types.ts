import type { User } from "@supabase/supabase-js";
export interface signUpProps {
  fullName: string;
  email: string;
  password: string;
}
export interface loginProps {
  email: string;
  password: string;
}

export type CombinedUser = User & {
  admin?: boolean;
  name?: string;
  address?: string;
  avatar_url?: string | null;
};

export type AuthContextType = {
  user: CombinedUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
};
