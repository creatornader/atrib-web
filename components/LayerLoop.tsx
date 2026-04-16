"use client"

/**
 * Layer-and-loop section, the placement diagram.
 *
 * Shape:
 *   - Inputs (top, 2 actors): Agent + Tool/Creator. Iconic portraits.
 *     Hovering either actor highlights its path into atrib so the
 *     visitor sees which SDK plugs in from which side. Either side
 *     works alone (degradation contract in the spec).
 *   - atrib band (middle): Signature / Chain / Receipt, the three
 *     primitives atrib provides.
 *   - Outcomes cycle (bottom, 3 phases): Payments → Compliance →
 *     Observability. Drawn as a visible loop: sequential arrows
 *     between the phases, and a curved return arrow from the last
 *     back to the first, so the row reads as a recurring cycle
 *     rather than three parallel labels.
 *
 * Policy stays demoted to a Receipt one-liner + the env var in the
 * hero code block.
 */

import { useState } from "react"
import {
  AgentIcon,
  ComplianceIcon,
  ObservabilityIcon,
  PaymentsIcon,
  ToolIcon,
} from "./Icons"
import type { ReactNode } from "react"

type HoveredInput = "agent" | "tool" | null

type InputActor = {
  label: string
  caption: string
  icon: ReactNode
}

type Outcome = {
  num: string
  label: string
  description: string
  icon: ReactNode
}

const INPUT_ACTORS: InputActor[] = [
  {
    label: "Agent",
    caption: "makes tool calls,\nreads the chain",
    icon: <AgentIcon size="lg" />,
  },
  {
    label: "Tool / Creator",
    caption: "fulfills calls,\nsigns responses",
    icon: <ToolIcon size="lg" />,
  },
]

const OUTCOMES: Outcome[] = [
  {
    num: "01",
    label: "Payments",
    description: "Receipts drive settlement. Payments trigger from the chain.",
    icon: <PaymentsIcon size="md" />,
  },
  {
    num: "02",
    label: "Compliance",
    description: "Tamper-proof audit trail. Article 12-ready, day one.",
    icon: <ComplianceIcon size="md" />,
  },
  {
    num: "03",
    label: "Observability",
    description: "OTel-native. The trace layer you already run.",
    icon: <ObservabilityIcon size="md" />,
  },
]

const PRIMITIVES = [
  {
    name: "Signature",
    body: "Every action, provably authored. Ed25519 over canonical JSON.",
  },
  {
    name: "Chain",
    body: "Every action, linked to what caused it. A causal graph, by construction.",
  },
  {
    name: "Receipt",
    body:
      "Every chain, readable by anyone. Settled against a policy, with sensible defaults and one-env-var overrides.",
  },
] as const

export function LayerLoop() {
  const [hoveredInput, setHoveredInput] = useState<HoveredInput>(null)

  return (
    <section
      aria-labelledby="layer-heading"
      className="relative w-full px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="kicker-rule" />
            <span className="kicker">The layer</span>
          </p>
          <h2
            id="layer-heading"
            className="mt-3 font-sans text-3xl font-medium tracking-[-0.01em] text-[var(--color-foreground)] sm:text-4xl"
          >
            One layer, three primitives,
            <br className="hidden sm:block" /> an open loop.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--color-muted-foreground)]">
            atrib sits between the agents that act and the systems that read
            those actions. Everything on the top plugs in through one package.
            Everything on the bottom comes back around.
          </p>
        </div>

        {/* Diagram */}
        <div className="relative rounded-xl border hairline-strong surface p-6 sm:p-10">
          {/* Input row label + framing line. The framing line names the
              two SDKs explicitly AND says out loud that either one works
              alone. Partial adoption is a first-class design goal of the
              protocol (degradation contract in the spec). */}
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <RowLabel text="Inputs" />
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              <span className="text-[var(--color-accent)]">@atrib/agent</span>
              {" + "}
              <span className="text-[var(--color-accent)]">@atrib/mcp</span>.
              Install either, the other, or both.
            </span>
          </div>

          {/* Input actors — form-fitting portraits with their flow
              arrows stacked directly below each card.
              Centered in the diagram as a trio: Agent | exchange | Tool.
              Each card column is auto-width so the flow arrow below
              lands exactly under the card's horizontal center. */}
          <div
            className="flex justify-center"
            data-hovered-input={hoveredInput ?? "none"}
          >
            {/* Desktop: 3-col grid (card / exchange / card), each card
                column also contains its own flow arrow in row 2. */}
            <div className="hidden sm:grid sm:grid-cols-[auto_auto_auto] sm:items-start sm:gap-x-8">
              {/* Column 1: Agent card + invokes arrow */}
              <div className="flex flex-col items-center gap-2">
                <InputActorCard
                  actor={INPUT_ACTORS[0]}
                  role="agent"
                  sdkName="@atrib/agent"
                  onEnter={() => setHoveredInput("agent")}
                  onLeave={() => setHoveredInput(null)}
                  active={hoveredInput === "agent"}
                  dimmed={hoveredInput === "tool"}
                />
                <FlowArrow
                  label="invokes"
                  active={hoveredInput === "agent"}
                  dimmed={hoveredInput === "tool"}
                />
              </div>

              {/* Column 2: exchange arrows between the two cards.
                  Self-starts near the card vertical centers so the
                  stacked call / signed-response pair reads as a
                  conversation between the two cards. */}
              <div
                aria-hidden="true"
                className="flex h-[200px] flex-col items-center justify-center gap-3 px-2"
              >
                <ExchangeArrow
                  label="calls"
                  direction="right"
                  tone="neutral"
                />
                <ExchangeArrow
                  label="signed response"
                  direction="left"
                  tone="accent"
                />
              </div>

              {/* Column 3: Tool card + signs arrow */}
              <div className="flex flex-col items-center gap-2">
                <InputActorCard
                  actor={INPUT_ACTORS[1]}
                  role="tool"
                  sdkName="@atrib/mcp"
                  onEnter={() => setHoveredInput("tool")}
                  onLeave={() => setHoveredInput(null)}
                  active={hoveredInput === "tool"}
                  dimmed={hoveredInput === "agent"}
                />
                <FlowArrow
                  label="signs"
                  active={hoveredInput === "tool"}
                  dimmed={hoveredInput === "agent"}
                />
              </div>
            </div>

            {/* Mobile: stacked vertically. Card, exchange, card. Flow
                arrow under each card. */}
            <div className="flex flex-col items-center gap-3 sm:hidden">
              <InputActorCard
                actor={INPUT_ACTORS[0]}
                role="agent"
                sdkName="@atrib/agent"
                onEnter={() => setHoveredInput("agent")}
                onLeave={() => setHoveredInput(null)}
                active={hoveredInput === "agent"}
                dimmed={hoveredInput === "tool"}
              />
              <FlowArrow
                label="invokes"
                active={hoveredInput === "agent"}
                dimmed={hoveredInput === "tool"}
              />
              <div
                aria-hidden="true"
                className="flex items-center gap-3 py-2"
              >
                <ExchangeArrow
                  label="calls"
                  direction="down"
                  tone="neutral"
                />
                <ExchangeArrow
                  label="signed response"
                  direction="up"
                  tone="accent"
                />
              </div>
              <InputActorCard
                actor={INPUT_ACTORS[1]}
                role="tool"
                sdkName="@atrib/mcp"
                onEnter={() => setHoveredInput("tool")}
                onLeave={() => setHoveredInput(null)}
                active={hoveredInput === "tool"}
                dimmed={hoveredInput === "agent"}
              />
              <FlowArrow
                label="signs"
                active={hoveredInput === "tool"}
                dimmed={hoveredInput === "agent"}
              />
            </div>
          </div>

          {/* atrib layer, the band. This is the centerpiece of the
              diagram. Visual weight tactics stacked here: thicker
              accent stripe, amber gradient on the header, outer glow,
              stronger surface, and the "atrib" mark is rendered as a
              display wordmark instead of a tiny label. */}
          <div
            className="
              relative overflow-hidden rounded-lg border border-[var(--color-accent)]
              bg-[var(--color-surface-raised)]
              shadow-[inset_4px_0_0_0_var(--color-accent),0_0_60px_-12px_rgba(232,160,79,0.25),0_24px_48px_-24px_rgba(0,0,0,0.8)]
            "
          >
            {/* Header, amber gradient wash behind a display wordmark. */}
            <div className="relative flex items-center justify-between border-b border-[var(--color-border-strong)] px-6 py-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-dim)] via-[var(--color-accent-faint)] to-transparent"
              />
              <div className="relative flex items-baseline gap-3">
                <span
                  aria-hidden="true"
                  className="
                    inline-block h-2 w-2 rounded-full bg-[var(--color-accent)]
                    shadow-[0_0_10px_0_var(--color-accent)]
                  "
                />
                <span className="font-mono text-[22px] font-medium leading-none tracking-[-0.02em] text-[var(--color-foreground)]">
                  atrib
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  the layer
                </span>
              </div>
              <span className="relative hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] sm:inline-block">
                protocol · apache 2.0
              </span>
            </div>

            <div className="grid divide-y hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {PRIMITIVES.map((p, i) => (
                <div key={p.name} className="p-5 sm:p-6">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[var(--color-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-lg font-medium text-[var(--color-foreground)]">
                      {p.name}
                    </h3>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Labeled flow from atrib into each outcome */}
          <FlowConnector
            flows={[
              { label: "settles", to: "pay" },
              { label: "audits", to: "comp" },
              { label: "traces", to: "obs" },
            ]}
            tone="output"
          />

          {/* Outcomes row label */}
          <RowLabel text="The cycle" accent />

          {/* Outcomes as a visible cycle.
              Desktop: three cards with arrows between + a curved
              loop-back arrow at the bottom.
              Mobile: stacks vertically with down-arrows, loop-back
              indicator beneath. */}
          <OutcomesCycle />

          {/* Loop caption */}
          <p className="mt-8 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
            Receipts flow out, settle, audit, and return as the next trace. The
            loop closes by itself. You didn&apos;t write a single line to make
            that happen.
          </p>
        </div>
      </div>
    </section>
  )
}

/** The three-phase outcomes cycle. Desktop uses a horizontal layout
 *  with chevron arrows between cards + a curved return path below.
 *  Mobile stacks vertically with vertical connectors. */
function OutcomesCycle() {
  return (
    <div className="relative">
      {/* Desktop: horizontal row with arrows */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-0">
          <OutcomeCard outcome={OUTCOMES[0]} position="first" />
          <CycleArrow />
          <OutcomeCard outcome={OUTCOMES[1]} position="middle" />
          <CycleArrow />
          <OutcomeCard outcome={OUTCOMES[2]} position="last" />
        </div>

        {/* Loop-back curve: from under the right-most card back to the
            left-most card, indicating the cycle repeats. Drawn as an SVG
            ribbon with an amber stroke. */}
        <div className="relative mt-3 h-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <marker
                id="arrow-loop"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 0 L 8 5 L 0 10 z"
                  fill="var(--color-accent)"
                />
              </marker>
            </defs>
            <path
              d="M 920 0 C 920 40, 880 56, 500 56 C 120 56, 80 40, 80 0"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-loop)"
              opacity="0.7"
            />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-surface)] px-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-accent)]">
              loops
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: vertical stack with down-arrows + loop indicator */}
      <div className="space-y-3 sm:hidden">
        <OutcomeCard outcome={OUTCOMES[0]} position="first" />
        <CycleArrow vertical />
        <OutcomeCard outcome={OUTCOMES[1]} position="middle" />
        <CycleArrow vertical />
        <OutcomeCard outcome={OUTCOMES[2]} position="last" />
        <div className="flex items-center gap-2 pt-2">
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--color-accent)]"
            style={{ opacity: 0.6 }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-accent)]">
            loops back
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--color-accent)]"
            style={{ opacity: 0.6 }}
          />
        </div>
      </div>
    </div>
  )
}

function OutcomeCard({
  outcome,
  position,
}: {
  outcome: Outcome
  position: "first" | "middle" | "last"
}) {
  return (
    <div
      data-position={position}
      className="
        group relative flex h-full flex-col overflow-hidden rounded-lg border
        border-[var(--color-border-strong)]
        bg-gradient-to-b from-[var(--color-surface-raised)]
        to-[var(--color-surface)]
        p-5 transition-colors duration-200
        hover:border-[var(--color-accent)]
      "
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          aria-hidden="true"
          className="
            inline-flex h-10 w-10 items-center justify-center rounded-md
            border border-[var(--color-border-strong)]
            bg-[var(--color-background)]
            text-[var(--color-accent)]
          "
        >
          {outcome.icon}
        </div>
        <span className="font-mono text-[11px] text-[var(--color-muted)]">
          {outcome.num}
        </span>
      </div>
      <div className="font-sans text-base font-medium text-[var(--color-foreground)]">
        {outcome.label}
      </div>
      <p className="mt-1.5 font-sans text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        {outcome.description}
      </p>
    </div>
  )
}

function CycleArrow({ vertical = false }: { vertical?: boolean }) {
  if (vertical) {
    return (
      <div
        aria-hidden="true"
        className="flex justify-center"
      >
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <path
            d="M 6 2 L 6 16 M 2 12 L 6 18 L 10 12"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
      </div>
    )
  }
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center px-2"
    >
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path
          d="M 2 6 L 16 6 M 12 2 L 18 6 L 12 10"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
    </div>
  )
}

/** Small left-aligned row label with a faint top rule. */
function RowLabel({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <div className="mb-4 mt-2 flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`inline-block h-px w-6 ${
          accent
            ? "bg-[var(--color-accent)]"
            : "bg-[var(--color-border-strong)]"
        }`}
      />
      <span
        className={`font-mono text-[11px] uppercase tracking-[0.15em] ${
          accent ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
        }`}
      >
        {text}
      </span>
    </div>
  )
}

/**
 * Labeled flow connector, vertical dashed lines with a label above
 * and a chevron at the bottom, showing what flows through each path.
 * "tone" switches the base accent color: muted amber for inputs into
 * the layer, full amber for outputs coming out.
 *
 * Each flow can optionally be marked `active` (a hovered actor's
 * path, bright) or `dimmed` (the other actor's path, faint). The
 * default (neither) uses the base-tone opacity. This creates the
 * "your path lights up, the other path fades" effect on hover.
 *
 * Animated marching-dashes carry the sense that data is actively
 * moving through each path. Disabled under prefers-reduced-motion.
 */
type Flow = {
  label: string
  to: string
  active?: boolean
  dimmed?: boolean
}

function FlowConnector({
  flows,
  tone,
}: {
  flows: Flow[]
  tone: "input" | "output"
}) {
  const stroke = "var(--color-accent)"
  const baseOpacity = tone === "input" ? 0.55 : 0.85

  function opacityFor(f: Flow) {
    if (f.active) return 1
    if (f.dimmed) return 0.18
    return baseOpacity
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none my-4 hidden sm:grid"
        style={{ gridTemplateColumns: `repeat(${flows.length}, 1fr)` }}
      >
        {flows.map((f) => {
          const op = opacityFor(f)
          return (
            <div
              key={f.to}
              className="flex flex-col items-center gap-1 transition-opacity duration-200"
              style={{ opacity: op }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.15em]"
                style={{ color: stroke }}
              >
                {f.label}
              </span>
              <svg
                width="12"
                height="28"
                viewBox="0 0 12 28"
                className="flow-line"
              >
                <line
                  x1="6"
                  y1="0"
                  x2="6"
                  y2="22"
                  stroke={stroke}
                  strokeWidth={f.active ? 1.8 : 1.2}
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  className="flow-dash"
                />
                <path
                  d="M 2 22 L 6 26 L 10 22"
                  stroke={stroke}
                  strokeWidth={f.active ? 1.8 : 1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          )
        })}
      </div>

      {/* Mobile: a single vertical down-arrow with the tone's label
          summarizing the flow. */}
      <div
        aria-hidden="true"
        className="my-5 flex flex-col items-center gap-1 sm:hidden"
        style={{ opacity: baseOpacity }}
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.15em]"
          style={{ color: stroke }}
        >
          {tone === "input" ? "invoke · sign" : "settle · audit · trace"}
        </span>
        <svg width="12" height="24" viewBox="0 0 12 24">
          <line
            x1="6"
            y1="0"
            x2="6"
            y2="18"
            stroke={stroke}
            strokeWidth="1.2"
            strokeDasharray="3 3"
            strokeLinecap="round"
            className="flow-dash"
          />
          <path
            d="M 2 18 L 6 22 L 10 18"
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Marching-dash animation is defined globally in globals.css. */}
    </>
  )
}

/** Bifröst beam: a gradient ribbon of light connecting each input
 *  card to the atrib band below. Replaces the earlier dashed-line-
 *  with-chevron. Behaves like a bridge rather than an arrow:
 *
 *    - fades from transparent at the top to amber at the bottom
 *    - terminates in a glowing radial burst at the landing point
 *    - intensifies when the corresponding input is hovered (`active`)
 *    - fades to ~15% when the opposite input is hovered (`dimmed`)
 *
 *  The SVG uses a filter-based glow, so the beam appears to have
 *  physical volume. The landing burst extends a few pixels below
 *  the beam's visible end so it overlaps the atrib band's top
 *  border and reads as "merging into the layer" rather than
 *  "stopping at the layer".
 */
function FlowArrow({
  label,
  active,
  dimmed,
}: {
  label: string
  active: boolean
  dimmed: boolean
}) {
  const accent = "var(--color-accent)"
  const containerOpacity = dimmed ? 0.18 : 1
  const beamOpacity = active ? 1 : 0.45
  const burstScale = active ? 1.3 : 1

  // Unique filter id per render, so two beams don't share a single
  // filter and their glows stay independent.
  const id = label.replace(/[^a-z]/gi, "")

  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center gap-1.5 transition-opacity duration-200"
      style={{ opacity: containerOpacity }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-200"
        style={{
          color: accent,
          opacity: active ? 1 : 0.75,
        }}
      >
        {label}
      </span>
      <svg
        width="32"
        height="44"
        viewBox="0 0 32 44"
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id={`beam-${id}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={accent} stopOpacity="0" />
            <stop
              offset="50%"
              stopColor={accent}
              stopOpacity={0.35}
            />
            <stop
              offset="100%"
              stopColor={accent}
              stopOpacity={0.95}
            />
          </linearGradient>
          <radialGradient id={`burst-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor={accent} stopOpacity="1" />
            <stop offset="40%" stopColor={accent} stopOpacity="0.7" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <filter
            id={`glow-${id}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation={active ? "2.5" : "1.5"} />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The beam itself. Wider when active. */}
        <rect
          x={active ? 13 : 14}
          y="0"
          width={active ? 6 : 4}
          height="36"
          rx={active ? 3 : 2}
          fill={`url(#beam-${id})`}
          filter={`url(#glow-${id})`}
          opacity={beamOpacity}
          style={{
            transition: "opacity 200ms ease-out",
          }}
        />

        {/* Landing burst. Scales up when hovered. Overlaps below the
            visible beam end so it merges into the atrib band rather
            than ending cleanly above it. */}
        <circle
          cx="16"
          cy="38"
          r={8}
          fill={`url(#burst-${id})`}
          filter={`url(#glow-${id})`}
          style={{
            transform: `scale(${burstScale})`,
            transformOrigin: "16px 38px",
            transition: "transform 200ms ease-out",
          }}
        />
        {/* Inner landing dot — the bright solid core at the contact
            point. Always visible, pulses subtly when active. */}
        <circle
          cx="16"
          cy="38"
          r={active ? 2.2 : 1.6}
          fill={accent}
          style={{
            transition: "r 200ms ease-out",
          }}
        />
      </svg>
    </div>
  )
}

/** Card for an input actor (Agent / Tool).
 *
 *  Centered icon well on top, label + caption below, SDK name
 *  surfaced at the bottom so the visitor sees exactly which package
 *  plugs in from this side. `active`/`dimmed` drive the hover-to-
 *  highlight-path interaction: hovering an actor accents its card
 *  and SDK pill, and dims the other actor so the page teaches
 *  "this is the path for my side". */
function InputActorCard({
  actor,
  sdkName,
  onEnter,
  onLeave,
  active,
  dimmed,
}: {
  actor: InputActor
  role: "agent" | "tool"
  sdkName: string
  onEnter: () => void
  onLeave: () => void
  active: boolean
  dimmed: boolean
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      className={`
        group relative flex w-[200px] flex-col items-center gap-4
        rounded-xl border px-5 py-6 outline-none
        transition-[border-color,opacity,background-color] duration-200
        focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        ${
          active
            ? "border-[var(--color-accent)] bg-[var(--color-surface)]"
            : "border-[var(--color-border-strong)] bg-[var(--color-background)] hover:border-[var(--color-muted-foreground)]"
        }
        ${dimmed ? "opacity-50" : "opacity-100"}
      `}
    >
      <div
        aria-hidden="true"
        className={`
          flex h-16 w-16 items-center justify-center
          rounded-xl border transition-colors duration-200
          ${
            active
              ? "border-[var(--color-accent)] bg-[var(--color-surface-raised)] text-[var(--color-accent)]"
              : "border-[var(--color-border-strong)] surface-raised text-[var(--color-foreground)]"
          }
        `}
      >
        {actor.icon}
      </div>
      <div className="text-center">
        <div className="font-sans text-base font-medium text-[var(--color-foreground)]">
          {actor.label}
        </div>
        <div className="mt-1 whitespace-pre-line font-mono text-xs leading-relaxed text-[var(--color-muted)]">
          {actor.caption}
        </div>
      </div>

      {/* SDK pill: shows which package this side installs. Accent-
          filled when this actor is the hovered focus. */}
      <span
        className={`
          mt-1 inline-flex items-center gap-1.5 rounded-full border
          px-2.5 py-1 font-mono text-[11px]
          transition-colors duration-200
          ${
            active
              ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-foreground)]"
              : "border-[var(--color-border-strong)] bg-[var(--color-background)] text-[var(--color-accent)]"
          }
        `}
      >
        <span
          aria-hidden="true"
          className={`
            h-1.5 w-1.5 rounded-full
            ${active ? "bg-[var(--color-accent)]" : "bg-[var(--color-muted)]"}
          `}
        />
        {sdkName}
      </span>
    </div>
  )
}

/** Labeled arrow used to show the exchange between Agent and Tool.
 *  The `tone` picks the accent color (amber for the signed response,
 *  muted for the outbound call) so the direction of the signing
 *  reads at a glance. */
function ExchangeArrow({
  label,
  direction,
  tone,
}: {
  label: string
  direction: "left" | "right" | "up" | "down"
  tone: "neutral" | "accent"
}) {
  const color =
    tone === "accent" ? "var(--color-accent)" : "var(--color-muted-foreground)"
  const opacity = tone === "accent" ? 0.9 : 0.7

  // Glyph: a simple one-way arrow in the requested direction.
  const glyph = (() => {
    switch (direction) {
      case "right":
        return (
          <svg width="56" height="12" viewBox="0 0 56 12" fill="none">
            <line
              x1="2"
              y1="6"
              x2="48"
              y2="6"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              className="flow-dash"
            />
            <path
              d="M 46 2 L 52 6 L 46 10"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
      case "left":
        return (
          <svg width="56" height="12" viewBox="0 0 56 12" fill="none">
            <line
              x1="8"
              y1="6"
              x2="54"
              y2="6"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              className="flow-dash flow-dash-reverse"
            />
            <path
              d="M 10 2 L 4 6 L 10 10"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
      case "down":
        return (
          <svg width="12" height="28" viewBox="0 0 12 28" fill="none">
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="22"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              className="flow-dash"
            />
            <path
              d="M 2 22 L 6 26 L 10 22"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
      case "up":
      default:
        return (
          <svg width="12" height="28" viewBox="0 0 12 28" fill="none">
            <line
              x1="6"
              y1="6"
              x2="6"
              y2="28"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeLinecap="round"
              className="flow-dash flow-dash-reverse"
            />
            <path
              d="M 2 6 L 6 2 L 10 6"
              stroke={color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )
    }
  })()

  // Horizontal arrows put the label above; vertical arrows put it
  // beside so the label remains readable either way.
  const layout =
    direction === "up" || direction === "down"
      ? "flex flex-col items-center gap-1"
      : "flex flex-col items-center gap-1"

  return (
    <div className={layout} style={{ opacity }}>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.15em]"
        style={{ color }}
      >
        {label}
      </span>
      {glyph}
    </div>
  )
}
