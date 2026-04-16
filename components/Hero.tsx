import { CopyButton } from "./CopyButton"
import { GithubIcon } from "./GithubIcon"
import { GITHUB_URL, INSTALL_ANCHOR, PACKAGE_NAME } from "@/lib/data"

const INSTALL_CMD = `pnpm add ${PACKAGE_NAME}`
const INTEGRATION_SNIPPET = `import { atrib } from "${PACKAGE_NAME}"

server.use(atrib())`

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-glow relative w-full px-6 pt-28 pb-24 sm:pt-36 sm:pb-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Small accent pill sitting above the headline. Pre-launch
            signaling that this is an early / open project, and an eye
            anchor the page badly needs. */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] surface px-3 py-1">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)]">
            v0.1 · open preview
          </span>
        </div>

        <h1
          id="hero-heading"
          className="font-sans text-4xl font-medium tracking-[-0.02em] text-[var(--color-foreground)] sm:text-5xl md:text-[58px] md:leading-[1.03]"
        >
          Live signatures{" "}
          <span className="text-[var(--color-muted-foreground)]">
            for every agent action.
          </span>
        </h1>

        {/* TODO(copy): hero sub-line, user authors final wording */}
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          An open protocol for cryptographic attribution of AI agent actions.
          One line of code, any framework, any payment rail.
        </p>

        {/* Install code block */}
        <div className="mt-10 max-w-2xl">
          <div className="group relative overflow-hidden rounded-lg border hairline-strong surface shadow-[0_1px_0_rgba(255,255,255,0.02)_inset,0_24px_64px_-32px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between border-b hairline surface-raised px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                />
                <span className="font-mono text-xs text-[var(--color-muted-foreground)]">
                  install
                </span>
              </div>
              <CopyButton value={INSTALL_CMD} />
            </div>
            <pre className="overflow-x-auto px-4 py-3.5 font-mono text-sm text-[var(--color-foreground)]">
              <code>{INSTALL_CMD}</code>
            </pre>
          </div>

          <div className="mt-3 overflow-hidden rounded-lg border hairline-strong surface">
            <div className="flex items-center justify-between border-b hairline surface-raised px-4 py-2.5">
              <span className="font-mono text-xs text-[var(--color-muted-foreground)]">
                server.ts
              </span>
              <CopyButton value={INTEGRATION_SNIPPET} />
            </div>
            <pre className="overflow-x-auto px-4 py-3.5 font-mono text-sm leading-relaxed text-[var(--color-foreground)]">
              <code>{INTEGRATION_SNIPPET}</code>
            </pre>
          </div>

        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={INSTALL_ANCHOR}
            className="
              inline-flex h-11 items-center justify-center rounded-md
              bg-[var(--color-foreground)] px-5 font-sans text-sm font-medium
              text-[var(--color-background)] transition-opacity duration-150
              hover:opacity-90
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--color-background)]
            "
          >
            Get started
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex h-11 items-center justify-center gap-2 rounded-md
              border border-[var(--color-border-strong)] surface px-5
              font-sans text-sm text-[var(--color-foreground)]
              transition-colors duration-150
              hover:bg-[var(--color-surface-raised)]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
              focus-visible:ring-offset-[var(--color-background)]
            "
          >
            <GithubIcon />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
