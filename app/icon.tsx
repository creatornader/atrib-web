import { ImageResponse } from "next/og"

// PNG favicon for browsers that do not handle SVG favicons reliably
// (notably iOS Safari mobile, which often refuses to render
// type="image/svg+xml" icons even though it supports SVG everywhere
// else). Same composition as icon.svg but rasterized to PNG. Coexists
// with icon.svg via Next.js's metadata route convention so browsers
// can pick whichever they support best.
//
// 192x192 picks a size large enough for HiDPI tab icons and Android
// PWA install prompts, small enough to keep the file lightweight.
export const dynamic = "force-static"
export const size = { width: 192, height: 192 }
export const contentType = "image/png"

export default function Icon() {
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
            width: 76,
            height: 76,
            borderRadius: "50%",
            background: "#e8a04f",
          }}
        />
      </div>
    ),
    { ...size },
  )
}
