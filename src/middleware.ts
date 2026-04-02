import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { sendTelegram } from "@/infrastructure/telegram";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Detect preferred language from Accept-Language header
  const needsLangCookie = !request.cookies.has("preferred-lang");
  let preferredLang: "ko" | "en" | null = null;
  if (needsLangCookie) {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    preferredLang = acceptLanguage.toLowerCase().includes("ko") ? "ko" : "en";
    response.cookies.set("preferred-lang", preferredLang, {
      maxAge: 31536000,
      path: "/",
      sameSite: "lax",
    });
  }

  // Only create Supabase client and refresh session if user has auth cookies
  const hasAuthCookie = request.cookies.getAll().some((c) => c.name.startsWith("sb-"));
  if (hasAuthCookie) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => {
              request.cookies.set(name, value);
            });
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
            // Re-apply preferred-lang cookie after response recreation
            if (preferredLang) {
              response.cookies.set("preferred-lang", preferredLang, {
                maxAge: 31536000,
                path: "/",
                sameSite: "lax",
              });
            }
          },
        },
      },
    );
    await supabase.auth.getUser();
  }

  // 페이지 접속 알림 (API, static, auth 제외)
  const path = request.nextUrl.pathname;
  if (!path.startsWith("/api/") && !path.startsWith("/auth/") && !path.startsWith("/_next/")) {
    const geo = request.headers.get("x-vercel-ip-country") ?? "??";
    const city = request.headers.get("x-vercel-ip-city") ?? "";
    const lang = request.cookies.get("preferred-lang")?.value ?? preferredLang ?? "?";
    const location = city ? `${city}, ${geo}` : geo;
    sendTelegram(`👀 <b>${path}</b>\n📍 ${location} · 🌐 ${lang}`);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
