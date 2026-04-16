/**
 * Source of truth for the landing page's runtime-derived content.
 *
 * NOTE: matrix axes are duplicated here from the public atrib repo's
 * detector lists (@atrib/mcp + @atrib/agent) as a deliberate MVP shortcut.
 * When we want strict single-source-of-truth, replace with a generate
 * step that reads the detector constants at build time and writes this
 * file, or import from the published packages once they're on npm.
 *
 * See docs/plans/2026-04-16-landing-page-brief.md (atrib-internal repo),
 * "Open questions for build session" section.
 */

export const FRAMEWORKS = [
  "MCP",
  "Claude Agent SDK",
  "Cloudflare Agents",
  "Vercel AI SDK",
  "LangChain",
  "Mastra",
] as const

export type Framework = (typeof FRAMEWORKS)[number]

export const PROTOCOLS = [
  "ACP",
  "UCP",
  "x402",
  "MPP",
  "AP2",
  "a2a-x402",
] as const

export type Protocol = (typeof PROTOCOLS)[number]

export const STANDARDS = [
  "ed25519",
  "sha-256",
  "rfc 6962",
  "jcs",
  "c2sp",
  "opentelemetry",
] as const

/**
 * GitHub repository URL.
 *
 * NOTE: currently private pending the launch-day flip. When the repo
 * goes public and/or migrates to an org, update this single constant
 * and every link on the site updates with it.
 */
export const GITHUB_URL = "https://github.com/creatornader/atrib"

/** Spec URL, direct link to the canonical specification */
export const SPEC_URL = `${GITHUB_URL}/blob/main/atrib-spec.md`

/** In-page anchor for the Standards section's CTA card */
export const INSTALL_ANCHOR = "#get-started"

/** Package name on npm */
export const PACKAGE_NAME = "@atrib/mcp"

/** Contact email */
export const CONTACT_EMAIL = "hello@atrib.dev"
