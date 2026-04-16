/**
 * Thesis section, ~40-60 word paragraph describing why atrib exists.
 * Copy here is a scaffold placeholder; user authors the final wording.
 *
 * Register: understated, warm, forward-looking. Plants the flag that
 * atrib sits *in* agent-to-payment flows as rails, not beside them as
 * an after-the-fact audit tool. Does not overclaim market readiness.
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

        {/* TODO(copy): user authors this paragraph. The shape is:
            one sentence naming the present (agents are taking real actions),
            one sentence threading the near-future (real money starts moving),
            one sentence naming atrib's place in that flow. */}
        <p className="font-sans text-xl leading-[1.55] text-[var(--color-foreground)] sm:text-2xl sm:leading-[1.5]">
          Agents are starting to take real actions, move real data, and soon
          move real money.{" "}
          <span className="text-[var(--color-muted-foreground)]">
            When that happens, the question of what actually happened, and who
            caused it, stops being a research topic and starts being an
            accounting one. atrib is the layer that answers it with
            cryptography, not promises.
          </span>
        </p>
      </div>
    </section>
  )
}
