import { ImageResponse } from "next/og"

// iOS home-screen icon. Same composition as icon.svg but at 180x180 PNG
// since iOS Safari doesn't support SVG for apple-touch-icon.
export const dynamic = "force-static"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(232,160,79,0.55) 0%, rgba(232,160,79,0.18) 22%, transparent 50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            background: "#e8a04f",
          }}
        />
      </div>
    ),
    { ...size },
  )
}
