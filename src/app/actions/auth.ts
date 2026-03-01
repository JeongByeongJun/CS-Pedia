"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { headers } from "next/headers";

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/?error=auth");
  }

  redirect(data.url);
}

export async function signInWithGithub() {
  const supabase = await createSupabaseServerClient();
  const origin = (await headers()).get("origin") ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error || !data.url) {
    redirect("/?error=auth");
  }

  redirect(data.url);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
