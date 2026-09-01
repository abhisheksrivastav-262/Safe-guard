"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSiteSettings, getNavigation } from "@/lib/cms";
import type { SiteSettings, NavigationItem } from "@/lib/types";

const defaultServices = [
  { label: "Security Services", href: "/security-services" },
  { label: "Facility Management", href: "/facility-management" },
  { label: "Housekeeping & Gardening", href: "/housekeeping" },
  { label: "Fire, Safety & Dog Squad", href: "/fire-safety" },
  { label: "Technical & STP Operations", href: "/technical-maintenance" },
  { label: "Detective & Investigation", href: "/detective-services" },
];

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [navItems, setNavItems] = useState<NavigationItem[] | null>(null);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(()=>{});
    getNavigation().then(setNavItems).catch(()=>{});
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const primaryPhone = settings?.primary_phone || "9323581437";
  const secondaryPhone = settings?.secondary_phone || "9136645289";
  const email = settings?.email || "info@safeguardforce.in";
  const logo = settings?.logo_url || "/images/safelogo.jpeg";
  const siteName = settings?.site_name || "SAFE Guard FORCE";

  const services = navItems ? navItems.filter(n=> n.parent_id) : defaultServices.map((s,i)=>({label:s.label, href:s.href} as any));
  // top level nav for desktop
  const topNav = navItems ? navItems.filter(n=> !n.parent_id && n.label !== "Services") : null;
  const serviceDropdown = services;

  return (
    <>
      <div className="hidden lg:block bg-[#070F1F] text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A253] animate-pulse" />
              {settings?.support_hours || "24/7 Professional Assistance"}
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>Mumbai • Nationwide Service Capability</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:${primaryPhone}`} className="flex items-center gap-2 hover:text-[#C5A253] transition min-h-[28px] touch-manipulation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {primaryPhone}
            </a>
            <span className="text-white/30">|</span>
            <a href={`tel:${secondaryPhone}`} className="hover:text-[#C5A253] transition min-h-[28px] flex items-center touch-manipulation">{secondaryPhone}</a>
            <a href={`mailto:${email}`} className="hidden xl:inline text-white/50 hover:text-white transition normal-case tracking-normal text-xs ml-2">{email}</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-[#0A1931]/95 nav-blur border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : "bg-[#0A1931] border-white/5"}`}>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between h-[60px] sm:h-[64px] lg:h-[76px]">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 touch-manipulation" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white p-0.5 shrink-0 overflow-hidden">
              <img src={logo} alt={siteName} className="w-full h-full object-contain" />
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-0.5 sm:gap-1">
                <span className="text-white font-black text-[15px] sm:text-[17px] lg:text-[19px] tracking-[0.04em]">SAFE</span>
                <span className="text-[#C5A253] font-black text-[15px] sm:text-[17px] lg:text-[19px] tracking-[0.04em]">GUARD</span>
                <span className="text-white font-light text-[15px] sm:text-[17px] tracking-[0.06em] sm:tracking-[0.08em] ml-0.5 sm:ml-1">FORCE</span>
              </div>
              <div className="text-[#C5A253] text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.20em] sm:tracking-[0.28em] lg:tracking-[0.32em] uppercase font-semibold mt-0.5">Nationwide Security Group</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {topNav ? (
              <>
                {topNav.map(item=> (
                  <Link key={item.id} href={item.href} className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">{item.label}</Link>
                ))}
              </>
            ) : (
              <>
                <Link href="/" className="text-white text-[12.5px] tracking-[0.14em] uppercase font-semibold hover:text-[#C5A253] transition min-h-[32px] flex items-center">Home</Link>
                <Link href="/about" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">About</Link>
              </>
            )}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition flex items-center gap-1.5 min-h-[32px]">
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition ${servicesOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-white shadow-2xl min-w-[280px] py-2 border-t-[3px] border-[#C5A253]">
                    {serviceDropdown.map((s:any) => (
                      <Link key={s.href} href={s.href} className="block px-6 py-3 text-[13px] font-medium text-slate-800 hover:bg-slate-50 hover:text-[#0A1931] border-b border-slate-100 last:border-0 transition min-h-[44px] flex items-center">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!topNav && (
              <>
                <Link href="/industries" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Industries</Link>
                <Link href="/detective-services" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Investigations</Link>
                <Link href="/contact" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Contact</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/contact" className="hidden lg:inline-flex bg-[#C5A253] hover:bg-[#B8941F] active:bg-[#A9893A] text-[#0A1931] text-[11px] tracking-[0.14em] uppercase font-bold px-6 py-3.5 transition items-center gap-2 min-h-[44px] touch-manipulation">
              Get Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href={`tel:${primaryPhone}`} className="hidden lg:inline-flex w-10 h-10 border border-white/20 items-center justify-center text-white hover:bg-white hover:text-[#0A1931] transition min-h-[40px] min-w-[40px] touch-manipulation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href={`tel:${primaryPhone}`} className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 bg-[#C5A253] flex items-center justify-center text-[#0A1931] active:bg-[#B8941F] transition touch-manipulation" aria-label="Call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 border border-white/20 active:bg-white/10 transition touch-manipulation" aria-label="Menu" aria-expanded={open}>
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-[#0A1931] border-t border-white/10 max-h-[calc(100vh-60px)] overflow-auto">
            <div className="px-4 py-4 space-y-1 pb-6">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white font-semibold tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px]">Home <span className="text-white/30">→</span></Link>
              <Link href="/about" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px]">About Us <span className="text-white/30">→</span></Link>
              <div className="py-2 border-b border-white/10">
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex items-center justify-between py-3 text-left min-h-[48px]">
                  <span className="text-[#C5A253] tracking-[0.18em] uppercase text-xs font-bold">Services</span>
                  <span className={`w-7 h-7 border border-white/15 flex items-center justify-center text-white/70 ${mobileServicesOpen ? "rotate-180 bg-white/5" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-1 pb-2">
                    {serviceDropdown.map((s:any) => (
                      <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 px-3 text-white/85 text-[13px] hover:text-white hover:bg-white/5 border-l-2 border-[#C5A253]/50 ml-1 min-h-[44px]">
                        <span className="w-1 h-1 bg-[#C5A253] rounded-full shrink-0" />{s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/industries" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px]">Industries <span className="text-white/30">→</span></Link>
              <Link href="/detective-services" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px]">Investigations <span className="text-white/30">→</span></Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px]">Contact <span className="text-white/30">→</span></Link>
              <div className="pt-5 flex flex-col gap-2.5">
                <a href={`tel:${primaryPhone}`} className="bg-[#C5A253] text-[#0A1931] text-center font-bold tracking-widest uppercase text-sm py-4">Call {primaryPhone}</a>
                <a href={`tel:${secondaryPhone}`} className="bg-white text-[#0A1931] text-center font-bold tracking-widest uppercase text-sm py-3.5">Call {secondaryPhone}</a>
                <a href={`https://wa.me/${settings?.whatsapp_number || "919323581437"}?text=Hello%20SAFE%20Guard%20FORCE`} target="_blank" className="border border-white/20 text-white text-center font-semibold tracking-widest uppercase text-sm py-4 flex items-center justify-center gap-2">WhatsApp Us</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
