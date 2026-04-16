/**
 * Thesis section. Two paragraphs at different scales of resolution:
 *
 *   P1: world-level picture. Names the transaction (agent calling tool),
 *       names the stakeholders, names atrib's position. Two-tone
 *       treatment: opening sentence in foreground, continuation muted.
 *
 *   P2: builder-level picture. Same section, second beat. Set off by
 *       spacing + subtle left rule + slightly smaller all-muted text so
 *       it reads as the concrete elaboration of the abstract claim
 *       above, without becoming a callout box or blockquote.
 */
export function Thesis() {
  return (
    <section
      aria-labelledby="thesis-heading"
      className="relative w-full px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="thesis-heading"
          className="sr-only"
        >
          Why atrib exists
        </h2>

        {/* P1: world-level. */}
        <p className="font-sans text-xl leading-[1.55] text-[var(--color-foreground)] sm:text-2xl sm:leading-[1.5]">
          Every time an agent calls a tool, something happens that someone
          (a buyer, a seller, an auditor) needs to record, bill for, or
          prove.{" "}
          <span className="text-[var(--color-muted-foreground)]">
            Today, no protocol does that. atrib is the missing layer.
          </span>
        </p>

        {/* P2: builder-level. Subtle left rule + smaller muted text. */}
        <div className="mt-10 border-l hairline pl-6 sm:mt-12 sm:pl-8">
          <p className="font-sans text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg sm:leading-[1.7]">
            Most MCP servers ship without good visibility into who calls them
            or how.{" "}
            <code className="rounded bg-[var(--color-surface)] px-1.5 py-0.5 font-mono text-[0.92em] text-[var(--color-foreground)]">
              server.use(atrib())
            </code>{" "}
            adds one line of middleware that produces a signed receipt for
            every response: caller, request, payload, signature. Each receipt
            links to the call that triggered it, forming a chain of agent
            activity rather than a flat log of hits. You can see how your tool
            fits into the larger flow and prove what you returned to anyone
            who asks. Charging per call later is just routing those receipts
            into any payment rail; you never write a billing layer.
          </p>
        </div>
      </div>
    </section>
  )
}
