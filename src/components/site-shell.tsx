import { Link } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const links = [
  ["/services", "Services"], ["/gallery", "Gallery"], ["/about", "Our Story"], ["/contact", "Visit Us"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
      if (session?.user) {
        void supabase.from("profiles").upsert({
          id: session.user.id,
          full_name: String(session.user.user_metadata["full_name"] ?? session.user.user_metadata["name"] ?? ""),
        });
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return <div className="min-h-screen bg-background text-foreground">
    <div className="overflow-hidden bg-foreground py-2 text-background">
      <div className="salon-marquee flex w-max gap-8 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em]">
        {[0, 1].map((copy) => <div key={copy} className="flex gap-8"><span>Walk-ins welcome</span><span>•</span><span>Fresh sets, softer moments</span><span>•</span><span>Open 7 days</span><span>•</span></div>)}
      </div>
    </div>
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="font-display text-4xl font-semibold">Veloura<span className="text-primary">.</span></Link>
        <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {links.map(([to, label]) => <Link key={to} to={to} activeProps={{ className: "text-primary" }} className="transition-colors hover:text-primary">{label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost"><Link to={signedIn ? "/account" : "/login"}>{signedIn ? "My Account" : "Log in"}</Link></Button>
          <Button asChild variant="salon"><Link to={signedIn ? "/account" : "/signup"}>{signedIn ? "My bookings" : "Sign up"}</Link></Button>
        </div>
        <Button aria-label="Open menu" variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <div className="border-t border-border px-5 py-5 md:hidden"><nav className="flex flex-col gap-4">{links.map(([to, label]) => <Link key={to} to={to} onClick={() => setOpen(false)}>{label}</Link>)}<Link to="/login">Log in</Link><Link to="/signup">Sign up</Link></nav></div>}
    </header>
    {children}
    <footer className="border-t border-border bg-accent/45">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div><div className="font-display text-4xl font-semibold">Veloura<span className="text-primary">.</span></div><p className="mt-2 max-w-xs text-sm text-muted-foreground">Fresh colour, meticulous care, and a little everyday glamour.</p></div>
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Explore</p><div className="flex flex-col gap-2 text-sm">{links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</div></div>
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-primary">Find us</p><p className="text-sm leading-7">Downtown studio<br/>Mon–Sat 10–8 · Sun 11–6<br/>hello@veloura.studio</p></div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground"><Sparkles className="mr-1 inline size-3"/> Veloura Nail Studio</div>
    </footer>
  </div>;
}