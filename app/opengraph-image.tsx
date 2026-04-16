import { ImageResponse } from "next/og"

// Open Graph card. 1200x630 to match the X / LinkedIn / Slack standard.
// Carries brand via the dark-plus-amber palette and the dot+wordmark
// composition that the live page uses in its atrib band header.
//
// Custom fonts are intentionally skipped: Satori does not support woff2
// (the format the brand mono ships in), and the brand identity carries
// fine through palette + layout for v1. Convert IoskeleyMono to ttf in
// a follow-up if the OG card lands in places where the system mono
// substitution feels jarring.
export const dynamic = "force-static"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "atrib · live signatures for every agent action"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(232,160,79,0.16) 0%, rgba(232,160,79,0.06) 30%, transparent 70%)",
          display: "flex",
          flexDirection: "column",
          padding: "80px 96px",
          fontFamily: '"SF Mono", ui-monospace, monospace',
        }}
      >
        {/* Top: open-preview pill, mirrors the hero pill on the live page */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#e8a04f",
              boxShadow: "0 0 18px rgba(232,160,79,0.6)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#e8a04f",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            v0.1 · open preview
          </div>
        </div>

        {/* Middle: wordmark row + headline, vertically centered */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {/* Wordmark: amber dot + atrib, mirroring the atrib band header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginBottom: 48,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e8a04f",
                boxShadow: "0 0 60px rgba(232,160,79,0.5)",
              }}
            />
            <div
              style={{
                fontSize: 128,
                fontWeight: 500,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#f5f4ee",
              }}
            >
              atrib
            </div>
          </div>

          {/* Hero line, two-tone (foreground emphasis on "Live signatures") */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            <div style={{ color: "#f5f4ee", display: "flex" }}>
              Live signatures
            </div>
            <div style={{ color: "#8a877e", display: "flex" }}>
              &nbsp;for every agent action.
            </div>
          </div>
        </div>

        {/* Bottom: footer row, license + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#8a877e",
            fontSize: 22,
            letterSpacing: "0.05em",
          }}
        >
          <div style={{ display: "flex" }}>open protocol · apache 2.0</div>
          <div style={{ display: "flex" }}>atrib.dev</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
