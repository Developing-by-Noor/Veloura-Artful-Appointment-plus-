import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/site-shell";
import hero from "@/assets/veloura-hero.jpg";
import lilacNails from "@/assets/veloura-lilac-nails.jpg";
import coralNails from "@/assets/veloura-coral-nails.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Veloura — Modern Nail Studio" },
    { name: "description", content: "Discover modern manicures, pedicures and expressive nail art at Veloura." },
    { property: "og:title", content: "Veloura — Modern Nail Studio" },
    { property: "og:description", content: "Fresh colour, meticulous care, and a little everyday glamour." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <SiteShell>
    <main>
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-6 lg:px-8">
        <div className="mb-2 overflow-hidden"><h1 className="salon-reveal text-center font-sans text-[clamp(4.7rem,14vw,12rem)] font-bold uppercase leading-[0.75] text-primary">VELOURA</h1></div>
        <div className="grid items-end gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em]">Modern nail studio</p>
            <h2 className="mt-4 font-display text-5xl font-medium italic leading-[0.92] sm:text-6xl">Your nails,<br/>your signature.</h2>
            <p className="mt-5 max-w-sm leading-7 text-muted-foreground">Expressive colour, thoughtful care, and flawless detail—made for how you want to feel today.</p>
            <Button asChild size="lg" variant="salon" className="mt-7"><Link to="/signup">Book your moment <ArrowUpRight/></Link></Button>
          </div>
          <img src={hero} width={1600} height={1008} alt="Veloura client showing her coral manicure" className="aspect-[16/10] w-full rounded-md object-cover" />
        </div>
      </section>
      <section className="bg-secondary py-4 text-foreground"><div className="overflow-hidden whitespace-nowrap text-center text-sm font-bold uppercase tracking-[0.12em]">Manicures&nbsp; • &nbsp;Pedicures&nbsp; • &nbsp;Gel sets&nbsp; • &nbsp;Nail art&nbsp; • &nbsp;Walk-ins welcome</div></section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">The edit</p><h2 className="mt-2 font-display text-5xl font-medium sm:text-6xl">Choose your finish</h2></div><Link to="/services" className="hidden font-semibold text-primary sm:block">View full menu →</Link></div>
        <div className="grid gap-5 md:grid-cols-3">
          {[{img:lilacNails,title:"Mirror Gel",price:"From $45"},{img:coralNails,title:"French, remixed",price:"From $55"},{img:hero,title:"Veloura Signature",price:"From $65"}].map((item) => <Link to="/services" key={item.title} className="group"><img loading="lazy" src={item.img} width={1008} height={1264} alt={item.title} className="aspect-[4/5] w-full rounded-md object-cover transition-transform duration-500 group-hover:-translate-y-1"/><div className="mt-4 flex justify-between"><h3 className="font-display text-3xl">{item.title}</h3><span className="text-sm font-semibold text-primary">{item.price}</span></div></Link>)}
        </div>
      </section>
    </main>
  </SiteShell>;
}
