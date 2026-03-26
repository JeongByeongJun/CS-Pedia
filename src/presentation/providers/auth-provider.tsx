"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/infrastructure/supabase/client";

interface AuthState {
  user: { email: string; name?: string; avatarUrl?: string } | null;
  bookmarkedIds: string[];
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthState>({
  user: null,
  bookmarkedIds: [],
  isLoggedIn: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    bookmarkedIds: [],
    isLoggedIn: false,
    isLoading: true,
  });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setState({ user: null, bookmarkedIds: [], isLoggedIn: false, isLoading: false });
        return;
      }

      const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("conference_id")
        .eq("user_id", user.id);

      setState({
        user: {
          email: user.email!,
          name: user.user_metadata?.full_name ?? user.user_metadata?.name,
          avatarUrl: user.user_metadata?.avatar_url,
        },
        bookmarkedIds: (bookmarks ?? []).map((b: { conference_id: string }) => b.conference_id),
        isLoggedIn: true,
        isLoading: false,
      });
    }

    loadAuth();
  }, []);

  return (
    <AuthContext value={state}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
