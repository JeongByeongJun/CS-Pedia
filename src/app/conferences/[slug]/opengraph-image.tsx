import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CS-Pedia Conference";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const acronym = slug.toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #16213e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            display: "flex",
            background:
              "linear-gradient(90deg, #6366f1, #a855f7, #ec4899, transparent)",
          }}
        />

        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            display: "flex",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 80px",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                fontSize: 24,
              }}
            >
              🎓
            </div>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#e4e4e7",
                letterSpacing: -1,
              }}
            >
              CS-<span style={{ color: "#818cf8" }}>Pedia</span>
            </span>
          </div>

          {/* Conference acronym */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: -3,
              marginBottom: 20,
              display: "flex",
            }}
          >
            {acronym}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: "#71717a",
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Deadline, Acceptance Rate & Best Papers
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {["Deadline", "Acceptance Rate", "Best Papers", "Rankings"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontSize: 14,
                    color: "#a1a1aa",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 80,
            fontSize: 18,
            color: "#52525b",
            display: "flex",
            letterSpacing: 1,
          }}
        >
          cs-pedia.io
        </div>
      </div>
    ),
    { ...size }
  );
}
