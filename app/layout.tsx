import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

const ioskeley = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    {
      path: "../public/fonts/IoskeleyMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IoskeleyMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IoskeleyMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "atrib · live signatures for every agent action",
  description:
    "An open protocol for cryptographic attribution of AI agent actions. Signatures, chains, receipts for the agent economy.",
  metadataBase: new URL("https://atrib.dev"),
  // Explicit icons override Next.js's auto-generated link tags so we
  // get clean URLs without the `?<hash>` cache-busting query strings
  // that Next.js appends by default. Some clients (notably iOS Safari)
  // have been reported to mishandle icon URLs with query strings,
  // showing a generic globe icon instead of the actual favicon. The
  // files referenced here exist at app/favicon.ico, app/icon.svg, and
  // public/apple-touch-icon.png.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "atrib",
    description: "Live signatures for every agent action.",
    url: "https://atrib.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "atrib",
    description: "Live signatures for every agent action.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ioskeley.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
