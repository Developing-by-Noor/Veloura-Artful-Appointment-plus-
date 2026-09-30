import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-border bg-secondary/35">
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-display text-6xl font-medium leading-[0.9] sm:text-7xl lg:text-8xl">{title}</h1>
      <div className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div>
    </div>
  </section>;
}