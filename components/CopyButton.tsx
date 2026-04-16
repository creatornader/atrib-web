"use client"

import { useState } from "react"

interface CopyButtonProps {
  value: string
  label?: string
  className?: string
}

/**
 * Small icon button that copies a string to the clipboard.
 * Gives ~1.5s of visible feedback on copy, falls back silently
 * when the Clipboard API is unavailable.
 */
export function CopyButton({ value, label = "Copy", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API may fail on insecure origins or permissions denied.
      // We intentionally don't surface this, the install line is still
      // visible and selectable as a fallback.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={`
        inline-flex items-center gap-1.5 rounded-md
        px-2.5 py-1.5 text-xs font-mono text-[var(--color-muted-foreground)]
        transition-colors duration-150
        hover:text-[var(--color-foreground)] hover:bg-[var(--color-border)]
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]
        ${className}
      `}
    >
      {copied ? (
        <>
          <CheckIcon />
          <span>copied</span>
        </>
      ) : (
        <>
          <CopyIcon />
          <span>{label.toLowerCase()}</span>
        </>
      )}
    </button>
  )
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <path d="M2 7V2.5A.5.5 0 0 1 2.5 2H7" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5l2.5 2.5L9.5 3.5" />
    </svg>
  )
}
