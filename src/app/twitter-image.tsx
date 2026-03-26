import { ImageResponse } from "next/og";
import { headers } from "next/headers";

export const runtime = "edge";
export const alt = "CS-Pedia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            display: "flex",
            background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, transparent)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "60px 80px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontSize: 24 }}>
              🎓
            </div>
            <span style={{ fontSize: 36, fontWeight: 700, color: "#e4e4e7", letterSpacing: -1 }}>
              CS-<span style={{ color: "#818cf8" }}>Pedia</span>
            </span>
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#fafafa", lineHeight: 1.2, letterSpacing: -2, marginBottom: 16, display: "flex", flexDirection: "column" }}>
            <span>Deadlines, Rankings</span>
            <span style={{ color: "#a1a1aa" }}>& Best Papers — all in one.</span>
          </div>
          <div style={{ fontSize: 22, color: "#71717a", lineHeight: 1.5, display: "flex" }}>
            {isKorean
              ? "BK21 · KIISE · Acceptance Rate · 데드라인 — 한국 CS 연구자를 위한 학회 통합 플랫폼"
              : "CORE · CCF · Acceptance Rates · 209 CS conferences tracked with 1,400+ best papers"}
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[
              { value: "209", label: "Conferences", color: "#818cf8" },
              { value: "1,480+", label: "Best Papers", color: "#a78bfa" },
              { value: "8", label: isKorean ? "기관 인정" : "Rankings", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "flex" }} />
                <span style={{ fontSize: 24, fontWeight: 700, color: "#fafafa", display: "flex" }}>{s.value}</span>
                <span style={{ fontSize: 14, color: "#71717a", textTransform: "uppercase", letterSpacing: 1, display: "flex" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 30, right: 80, fontSize: 18, color: "#52525b", display: "flex", letterSpacing: 1 }}>
          cs-pedia.io
        </div>
      </div>
    ),
    { ...size }
  );
}
