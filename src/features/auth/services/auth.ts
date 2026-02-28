import { supabase } from "../../../shared/services/supabase";
import type { loginProps, signUpProps } from "../types";

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://big-e-commerce-gamma.vercel.app/",
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export const signUpWithEmail = async ({
  fullName,
  email,
  password,
}: signUpProps) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      console.error("Error:", error.message);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export const login = async ({ email, password }: loginProps) => {
  try {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const user = await fetchUserData(session.user.id);

    return {
      ...session.user,
      ...user,
    };
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error:", error.message);
      throw error;
    }

    return true;
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};

export async function fetchUserData(userId: number | string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw new Error(error.message);
    if (!data) {
      console.warn(`No user found with id ${userId}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Fetch user data error:", err);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) throw new Error(sessionError.message);

    if (!session) return null;

    const user = await fetchUserData(session.user.id);

    return {
      ...session.user,
      ...user,
    };
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}
