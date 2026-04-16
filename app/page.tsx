import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { LayerLoop } from "@/components/LayerLoop"
import { Matrix } from "@/components/Matrix"
import { Standards } from "@/components/Standards"
import { Thesis } from "@/components/Thesis"

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <Thesis />
        <SectionDivider />
        <LayerLoop />
        <SectionDivider />
        <Matrix />
        <SectionDivider />
        <Standards />
      </main>
      <Footer />
    </>
  )
}

// Subtle divider between sections. A thin rule plus a small amber tick
// in the center makes the section boundary legible without being loud.
function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-5xl items-center px-6" aria-hidden="true">
      <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
      <div className="mx-3 h-1 w-1 rotate-45 bg-[var(--color-accent)] opacity-60" />
      <div className="h-px flex-1 bg-[var(--color-border-strong)]" />
    </div>
  )
}
