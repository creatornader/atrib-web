/**
 * Line-based icons for the layer diagram actors.
 *
 * Sizing convention:
 *   - size="sm", 20px, for compact input-row actors (Agent, Tool)
 *   - size="md", 28px, for prominent outcome-row actors
 *                 (Payments, Compliance, Observability)
 *
 * Style: 1.5px strokes, rounded endings, currentColor so parent
 * containers drive color. Keep the shapes simple enough to read
 * at 20px; avoid internal detail that collapses at that size.
 */

type IconProps = {
  size?: "sm" | "md" | "lg"
  className?: string
}

const dims = {
  sm: { w: 20, h: 20, stroke: 1.4 },
  md: { w: 28, h: 28, stroke: 1.5 },
  lg: { w: 36, h: 36, stroke: 1.5 },
}

/** Agent, speech bubble with a small dot, suggesting "this thing
 *  talks and decides." */
export function AgentIcon({ size = "sm", className = "" }: IconProps) {
  const { w, h, stroke } = dims[size]
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H13l-4 3v-3H5.5A1.5 1.5 0 0 1 4 14.5v-9Z" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" />
    </svg>
  )
}

/** Tool / Creator, curly-brace pair, the universal "code / function"
 *  glyph. Reads as "this is a callable unit" at a glance. */
export function ToolIcon({ size = "sm", className = "" }: IconProps) {
  const { w, h, stroke } = dims[size]
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 4H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2" />
      <path d="M15 4h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2" />
    </svg>
  )
}

/** Payments, coin with a dollar slash, the universal money glyph.
 *  Clean enough to read at 20px but clearly commercial. */
export function PaymentsIcon({ size = "md", className = "" }: IconProps) {
  const { w, h, stroke } = dims[size]
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v10" />
      <path d="M15 9.5c0-1.1-1.34-2-3-2s-3 .9-3 2 1.34 2 3 2 3 .9 3 2-1.34 2-3 2-3-.9-3-2" />
    </svg>
  )
}

/** Compliance, shield with an internal checkmark. Reads as
 *  "audit-grade, trusted" at small sizes. */
export function ComplianceIcon({ size = "md", className = "" }: IconProps) {
  const { w, h, stroke } = dims[size]
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3 4.5 5.5V11c0 4.5 3.3 8.4 7.5 9.5 4.2-1.1 7.5-5 7.5-9.5V5.5L12 3Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

/** Observability, waveform pulse line, the universal trace/metrics
 *  glyph. Matches how OTel is usually shown. */
export function ObservabilityIcon({ size = "md", className = "" }: IconProps) {
  const { w, h, stroke } = dims[size]
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12h3l2-5 4 10 3-7 2 4h4" />
    </svg>
  )
}
