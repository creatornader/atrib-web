import { CopyButton } from "./CopyButton"
import { GithubIcon } from "./GithubIcon"
import { GITHUB_URL, INSTALL_ANCHOR, PACKAGE_NAME, SPEC_URL, STANDARDS } from "@/lib/data"

const INSTALL_CMD = `pnpm add ${PACKAGE_NAME}`

const PROOF_POINTS = [
  {
    title: "Independently verifiable",
    body: "Any party can verify any record without trusting atrib.",
  },
  {
    title: "Zero custom crypto",
    body: "Ed25519, JCS, SHA-256, RFC 6962 Merkle trees. No invented primitives.",
  },
  {
    title: "Works with what you use",
    body: "Plugs into existing OTel traces. Integrates every framework, every rail.",
  },
  {
    title: "Open source, self-hostable",
    body: "Apache 2.0. Run your own log. The protocol doesn't require us.",
  },
] as const

export function Standards() {
  return (
    <section
      aria-labelledby="standards-heading"
      className="relative w-full px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Standards strip */}
        <div className="mb-16 rounded-xl border hairline-strong surface p-6 sm:p-8">
          <p className="mb-4 flex items-center gap-2">
            <span aria-hidden="true" className="kicker-rule" />
            <span className="kicker">Builds on</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            {STANDARDS.map((s, i) => (
              <div key={s} className="flex items-center gap-4">
                <span className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-background)] px-2.5 py-1 font-mono text-sm text-[var(--color-foreground)]">
                  {s}
                </span>
                {i < STANDARDS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[var(--color-border-strong)]"
                  />
                ) : null}
              </div>
            ))}
          </div>
          {/* Framing line: gestures back at the standards strip above
              ("each of these"), names atrib's role (the protocol that
              wires them), names the user-side benefit (verifiable
              receipts). Replaces an earlier defensive phrasing that
              led with what atrib doesn't do. */}
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            Each of these is open and standard. atrib is the protocol that
            wires them into receipts anyone can verify.
          </p>

          {/* The full chain: exact operations + specs, end-to-end, so the
              page isn't hand-wavy about the cryptography. Numbered steps
              mirror spec §1 (record + signing) and §2 (Merkle log).
              Verification line at the bottom makes the "don't trust atrib"
              claim concrete by naming the three independent checks. */}
          <div className="mt-6 max-w-2xl">
            <p className="mb-3 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[var(--color-accent)]"
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-accent)]">
                The full chain
              </span>
            </p>
            <ol className="space-y-2 font-sans text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {[
                "Ed25519 signature (RFC 8032) over JCS-canonicalized JSON (RFC 8785).",
                "Record hash committed to an append-only Merkle log (RFC 6962).",
                "Log served via C2SP tlog-tiles, state signed as C2SP tlog-checkpoints.",
                "Each record bound to the agent's OpenTelemetry trace via its W3C Trace Context trace-id.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex-shrink-0 font-mono text-[11px] text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-sans text-sm italic leading-relaxed text-[var(--color-muted-foreground)]">
              Verifying a record runs three independent cryptographic checks:
              signature validity, Merkle inclusion proof, and checkpoint
              signature. None require trusting atrib.
            </p>
          </div>
        </div>

        {/* Proof + CTA split */}
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <p className="mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="kicker-rule" />
              <span className="kicker">Why you can build on it</span>
            </p>
            <h2
              id="standards-heading"
              className="font-sans text-2xl font-medium tracking-[-0.01em] text-[var(--color-foreground)] sm:text-3xl"
            >
              Receipts you don&apos;t have to trust us for.
            </h2>
            <ul className="mt-8 grid gap-y-6 gap-x-10 sm:grid-cols-2">
              {PROOF_POINTS.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-1 font-mono text-xs text-[var(--color-accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-sans text-sm font-medium text-[var(--color-foreground)]">
                      {p.title}
                    </div>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA block, elevated surface so it reads as the "act here" moment. */}
          <div className="md:col-span-2">
            <div
              id={INSTALL_ANCHOR.slice(1)}
              className="rounded-xl border hairline-strong surface-raised p-6 scroll-mt-20 shadow-[0_24px_64px_-32px_rgba(0,0,0,0.8)]"
            >
              <p className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                />
                <span className="kicker">Start in a minute</span>
              </p>
              <p className="mt-3 font-sans text-base leading-relaxed text-[var(--color-foreground)]">
                Install the package, drop one line into your server, get a log
                key.
              </p>

              <div className="mt-5 overflow-hidden rounded-md border hairline-strong surface">
                <div className="flex items-center justify-between border-b hairline px-3 py-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
                    install
                  </span>
                  <CopyButton value={INSTALL_CMD} />
                </div>
                <pre className="overflow-x-auto px-3 py-2.5 font-mono text-xs text-[var(--color-foreground)]">
                  <code>{INSTALL_CMD}</code>
                </pre>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-10 items-center justify-center gap-2 rounded-md
                    bg-[var(--color-foreground)] px-4 font-sans text-sm font-medium
                    text-[var(--color-background)] transition-opacity duration-150
                    hover:opacity-90
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--color-background)]
                  "
                >
                  <GithubIcon />
                  <span>View on GitHub</span>
                </a>
                <a
                  href={SPEC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex h-10 items-center justify-center rounded-md
                    border border-[var(--color-border-strong)] surface px-4
                    font-sans text-sm text-[var(--color-foreground)]
                    transition-colors duration-150
                    hover:bg-[var(--color-border)]
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2
                    focus-visible:ring-offset-[var(--color-background)]
                  "
                >
                  Read the spec
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
