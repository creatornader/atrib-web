# atrib-web

Landing page for [atrib](https://atrib.dev), an open protocol for cryptographic attribution of AI agent actions.

This repository contains the marketing surface (atrib.dev). The protocol specification, SDK packages, and services live in [atrib](https://github.com/atrib-inc/atrib).

## Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript strict
- Tailwind CSS v4
- Self-hosted fonts: [Inter](https://rsms.me/inter/) (sans), [IoskeleyMono](https://github.com/ahatem/IoskeleyMono) (mono)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
```

Outputs a static site to `out/`. Deployable as-is to any static host; configured for Vercel.

## Structure

```
app/
  layout.tsx          Root layout + font wiring + metadata
  page.tsx            Landing page section composition
  globals.css         Theme tokens + base styles

components/
  Hero.tsx            Above-the-fold: framing + install code + CTAs
  Thesis.tsx          Why atrib exists (short warm paragraph)
  LayerLoop.tsx       Placement diagram: Signature / Chain / Receipt
  Matrix.tsx          Framework × protocol coverage grid (hover-trail)
  Standards.tsx       Standards strip + proof points + CTA
  Footer.tsx          Minimal link row
  CopyButton.tsx      Clipboard helper used in code blocks

lib/
  data.ts             Source of truth for frameworks, protocols, standards, links
```

## Content

Copy in placeholder sections (Hero line, Thesis paragraph, Standards framing line) is scaffolded and marked with `TODO(copy)` comments. The page is designed to land cleanly once those are authored.

## License

Apache 2.0. See [LICENSE](./LICENSE).

IoskeleyMono is distributed under the SIL Open Font License 1.1. The license is included at [public/fonts/IoskeleyMono-LICENSE.txt](./public/fonts/IoskeleyMono-LICENSE.txt).
