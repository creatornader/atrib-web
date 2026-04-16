import { CONTACT_EMAIL, GITHUB_URL, SPEC_URL } from "@/lib/data"

export function Footer() {
  return (
    <footer className="w-full border-t hairline px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[var(--color-foreground)]">
            atrib
          </span>
          <span className="font-mono text-xs text-[var(--color-muted)]">
            · open protocol · apache 2.0
          </span>
        </div>
        <nav className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
          >
            github
          </a>
          <a
            href={SPEC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
          >
            spec
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-xs text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
          >
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  )
}
