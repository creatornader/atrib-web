"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CopyButton } from "./CopyButton"
import { FRAMEWORKS, PROTOCOLS, type Framework, type Protocol } from "@/lib/data"
import { exampleFor } from "@/lib/examples"

/**
 * Matrix section, frameworks × payment protocols coverage grid.
 *
 * Hook: the visible footprint IS the claim. Every cell is filled.
 * 6 × 6 = 36 combinations supported on day one.
 *
 * Interaction:
 *   - Hover: a cell ignites fast and fades back over ~900ms, leaving
 *     a natural trail of recently-lit cells behind the pointer.
 *   - Click: pins that cell. While any cell is pinned, hover-trail
 *     on the others is suspended so the pinned cell is the only
 *     highlighted element. Click outside any cell (or press Escape)
 *     to deselect.
 *   - Keyboard: Enter / Space toggles the pin on a focused cell.
 *
 * Fallback: prefers-reduced-motion zeroes out the trail transitions
 * so cells illuminate instantly without the decay.
 */

const ROWS = FRAMEWORKS
const COLS = PROTOCOLS
const TOTAL = ROWS.length * COLS.length

function cellId(row: string, col: string) {
  return `${row}:${col}`
}

export function Matrix() {
  const [pinned, setPinned] = useState<string | null>(null)
  const pinnedRef = useRef<string | null>(null)
  const rafRef = useRef<number | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)

  // Mirror pinned into a ref so the pointer-move handler (captured
  // by React's memoized callback) can read current value without rebinding.
  useEffect(() => {
    pinnedRef.current = pinned
  }, [pinned])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // While pinned, don't illuminate other cells on hover.
      if (pinnedRef.current != null) return
      const target = e.target as HTMLElement
      if (!target.dataset?.cell) return
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        if (pinnedRef.current != null) return
        target.dataset.lit = "1"
        window.setTimeout(() => {
          if (target.dataset?.lit === "1") target.dataset.lit = "0"
        }, 40)
      })
    },
    [],
  )

  const handleCellClick = useCallback((id: string) => {
    setPinned((current) => (current === id ? null : id))
  }, [])

  // Click-outside deselect + Escape-to-deselect. Active only while pinned.
  useEffect(() => {
    if (pinned == null) return

    function onDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target || !target.closest?.("[data-cell]")) {
        setPinned(null)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPinned(null)
    }

    document.addEventListener("click", onDocumentClick)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("click", onDocumentClick)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [pinned])

  // Derive active row / column from pinned cell id. Used to highlight
  // the headers and axis lines so the intersection reads visibly.
  const [pinnedRow, pinnedCol] = pinned ? pinned.split(":", 2) : [null, null]

  return (
    <section
      aria-labelledby="matrix-heading"
      className="relative w-full px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="kicker-rule" />
            <span className="kicker">The surface</span>
          </p>
          <h2
            id="matrix-heading"
            className="mt-3 font-sans text-3xl font-medium tracking-[-0.01em] text-[var(--color-foreground)] sm:text-4xl"
          >
            One package. Every framework. Every rail.
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-[var(--color-muted-foreground)]">
            <span className="font-mono text-[var(--color-foreground)]">
              {ROWS.length}
            </span>{" "}
            agent frameworks ·{" "}
            <span className="font-mono text-[var(--color-foreground)]">
              {COLS.length}
            </span>{" "}
            payment protocols ·{" "}
            <span className="font-mono text-[var(--color-accent)]">
              {TOTAL}
            </span>{" "}
            supported combinations on day one.
          </p>
        </div>

        {/* Grid */}
        <div
          className="overflow-x-auto overflow-y-hidden rounded-lg border hairline-strong surface p-2 sm:p-4"
          data-pinned={pinned != null ? "1" : "0"}
          ref={gridRef}
        >
          <div
            role="grid"
            aria-label="Coverage matrix of agent frameworks and payment protocols"
            aria-multiselectable="false"
            className="inline-block min-w-full"
          >
            {/* Column header row */}
            <div
              role="row"
              className="grid"
              style={{
                gridTemplateColumns: `minmax(180px, 1fr) repeat(${COLS.length}, minmax(80px, 1fr))`,
              }}
            >
              <div role="columnheader" className="px-3 py-2.5" />
              {COLS.map((col) => {
                const isActive = pinnedCol === col
                return (
                  <div
                    key={col}
                    role="columnheader"
                    data-axis-active={isActive ? "1" : "0"}
                    className={`
                      matrix-axis px-2 py-2.5 text-center font-mono text-[11px]
                      uppercase tracking-wider
                      ${
                        isActive
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-muted)]"
                      }
                    `}
                  >
                    {col}
                  </div>
                )
              })}
            </div>

            {/* Body rows */}
            <div
              onPointerMove={handlePointerMove}
              className="overflow-hidden rounded-md border hairline bg-[var(--color-background)]"
            >
              {ROWS.map((row, rIdx) => {
                const rowActive = pinnedRow === row
                return (
                  <div
                    key={row}
                    role="row"
                    className={`grid ${rIdx < ROWS.length - 1 ? "border-b hairline" : ""}`}
                    style={{
                      gridTemplateColumns: `minmax(180px, 1fr) repeat(${COLS.length}, minmax(80px, 1fr))`,
                    }}
                  >
                    <div
                      role="rowheader"
                      data-axis-active={rowActive ? "1" : "0"}
                      className={`
                        matrix-axis flex items-center border-r hairline
                        px-4 py-3 font-sans text-sm transition-colors duration-150
                        ${
                          rowActive
                            ? "text-[var(--color-accent)] bg-[var(--color-surface)]"
                            : "text-[var(--color-foreground)]"
                        }
                      `}
                    >
                      {row}
                    </div>
                    {COLS.map((col, cIdx) => {
                      const id = cellId(row, col)
                      const isPinned = pinned === id
                      const colActive = pinnedCol === col
                      const inAxis = rowActive || colActive
                      const dataLit = isPinned
                        ? "pinned"
                        : inAxis
                          ? "axis"
                          : "0"
                      return (
                        <button
                          type="button"
                          key={col}
                          role="gridcell"
                          data-cell={id}
                          data-lit={dataLit}
                          aria-label={`${row} × ${col}${isPinned ? ", selected" : ""}`}
                          aria-selected={isPinned}
                          onClick={() => handleCellClick(id)}
                          className={`
                            matrix-cell relative flex items-center justify-center
                            py-3 text-[var(--color-muted)] outline-none
                            focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]
                            ${cIdx < COLS.length - 1 ? "border-r hairline" : ""}
                          `}
                        >
                          <CheckGlyph />
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Caption line below grid, shifts content to reflect pinned state. */}
        <p className="mt-5 flex min-h-[1.5rem] items-center gap-2 font-mono text-xs text-[var(--color-muted)]">
          {pinned ? (
            <>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
              <span className="text-[var(--color-foreground)]">
                {pinned.replace(":", " × ")}
              </span>
              <span>· supported · click again or press esc to deselect</span>
            </>
          ) : (
            <>
              New frameworks and protocols ship as additive detectors. The
              grid grows without a breaking change.
            </>
          )}
        </p>

        {/* Code example for the pinned combination.
            Reveals in place below the caption so the grid stays anchored. */}
        {pinned ? <PinnedExample pinned={pinned} /> : null}
      </div>

      {/* Per-cell animation styles.
          Fast ignition (20ms) + slow decay (900ms) produces the trail.
          Pinned state is stronger and ignored by the trail system. */}
      <style>{`
        .matrix-cell {
          background-color: transparent;
          transition:
            background-color 900ms ease-out,
            color 900ms ease-out,
            box-shadow 900ms ease-out;
        }
        .matrix-cell[data-lit="1"] {
          background-color: color-mix(in oklab, var(--color-accent) 18%, transparent);
          color: var(--color-foreground);
          transition:
            background-color 20ms ease-out,
            color 20ms ease-out;
        }
        .matrix-cell[data-lit="pinned"] {
          background-color: color-mix(in oklab, var(--color-accent) 32%, transparent);
          color: var(--color-foreground);
          box-shadow: inset 0 0 0 1px var(--color-accent);
          transition:
            background-color 120ms ease-out,
            color 120ms ease-out,
            box-shadow 120ms ease-out;
        }
        .matrix-cell svg {
          opacity: 0.5;
          transition: opacity 900ms ease-out;
        }
        .matrix-cell[data-lit="1"] svg {
          opacity: 1;
          transition: opacity 20ms ease-out;
        }
        .matrix-cell[data-lit="pinned"] svg {
          opacity: 1;
          color: var(--color-accent);
          transition: opacity 120ms ease-out, color 120ms ease-out;
        }
        /* Axis highlight: cells in the same row or column as the pinned
           cell get a faint amber tint, visually drawing the axes that
           converge at the pinned intersection. */
        .matrix-cell[data-lit="axis"] {
          background-color: color-mix(in oklab, var(--color-accent) 6%, transparent);
          transition: background-color 120ms ease-out;
        }
        .matrix-cell[data-lit="axis"] svg {
          opacity: 0.75;
          transition: opacity 120ms ease-out;
        }
        /* Suspend hover-trail on cells that aren't pinned or on-axis
           while a pin is active, keeps the axis highlight readable. */
        [data-pinned="1"] .matrix-cell[data-lit="0"] {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .matrix-cell, .matrix-cell svg { transition: none !important; }
        }
      `}</style>
    </section>
  )
}

function CheckGlyph() {
  // Small diamond ignites with the cell. More abstract than a checkmark;
  // reads as "presence" without a literal claim of pass/fail.
  return (
    <svg
      aria-hidden="true"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="currentColor"
    >
      <rect x="1" y="1" width="6" height="6" rx="1.2" transform="rotate(45 4 4)" />
    </svg>
  )
}

/**
 * Code panel that appears below the grid when a cell is pinned.
 * Shows the concise integration example for that framework × protocol
 * combination, copy-pasteable, with a visible copy button.
 */
function PinnedExample({ pinned }: { pinned: string }) {
  // Parse "Framework:Protocol" back out. Both axes are string literal
  // unions from lib/data, so the cast is safe given how pinned is set.
  const [frameworkRaw, protocolRaw] = pinned.split(":", 2)
  const framework = frameworkRaw as Framework
  const protocol = protocolRaw as Protocol

  const example = useMemo(() => exampleFor(framework, protocol), [framework, protocol])

  // Key by `pinned` so React swaps the subtree when the user picks a
  // different cell, which replays the subtle fade-in for clarity.
  return (
    <div
      key={pinned}
      className="
        pinned-example mt-4 overflow-hidden rounded-lg
        border hairline-strong surface-raised
        shadow-[0_16px_40px_-24px_rgba(0,0,0,0.8)]
      "
    >
      <div className="flex items-center justify-between border-b hairline px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
          />
          <span className="font-mono text-xs text-[var(--color-foreground)]">
            {framework} × {protocol}
          </span>
          <span className="font-mono text-xs text-[var(--color-muted)]">
            · example
          </span>
        </div>
        <CopyButton value={example.code} />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-[var(--color-foreground)]">
        <code>{example.code}</code>
      </pre>

      <style>{`
        .pinned-example {
          animation: pinned-example-in 220ms ease-out;
          transform-origin: top center;
        }
        @keyframes pinned-example-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pinned-example { animation: none; }
        }
      `}</style>
    </div>
  )
}
