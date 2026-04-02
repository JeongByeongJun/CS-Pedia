import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/infrastructure/supabase/types/database.types";
import { sendTelegram } from "@/infrastructure/telegram";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";
  // Prevent open redirect: only allow relative paths
  if (!next.startsWith("/") || next.startsWith("//")) {
    next = "/";
  }

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.headers
              .get("cookie")
              ?.split("; ")
              .map((c) => {
                const [name, ...rest] = c.split("=");
                return { name, value: rest.join("=") };
              }) ?? [];
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        const user = data.user;
        const createdAt = new Date(user.created_at).getTime();
        const isNewUser = Date.now() - createdAt < 60_000; // 1분 이내 = 신규

        if (isNewUser) {
          sendTelegram(
            `🎉 <b>새 회원 가입!</b>\n` +
            `이메일: ${user.email ?? "unknown"}\n` +
            `Provider: ${user.app_metadata?.provider ?? "unknown"}`
          );
        }

        return response;
      }
    } catch {
      // SDK threw unexpectedly — fall through to error redirect
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}
