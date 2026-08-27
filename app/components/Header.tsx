"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const services = [
  { label: "Security Services", href: "/security-services" },
  { label: "Facility Management", href: "/facility-management" },
  { label: "Housekeeping & Gardening", href: "/housekeeping" },
  { label: "Fire, Safety & Dog Squad", href: "/fire-safety" },
  { label: "Technical & STP Operations", href: "/technical-maintenance" },
  { label: "Detective & Investigation", href: "/detective-services" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Top bar - hidden on mobile, visible lg */}
      <div className="hidden lg:block bg-[#070F1F] text-white text-[11px] tracking-[0.18em] uppercase">
        <div className="max-w-[1280px] mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A253] animate-pulse" />
              24/7 Professional Assistance
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span>Mumbai • Nationwide Service Capability</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:9323581437" className="flex items-center gap-2 hover:text-[#C5A253] transition min-h-[28px] touch-manipulation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              9323581437
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:9136645289" className="hover:text-[#C5A253] transition min-h-[28px] flex items-center touch-manipulation">9136645289</a>
            <a href="mailto:info@safeguardforce.in" className="hidden xl:inline text-white/50 hover:text-white transition normal-case tracking-normal text-xs ml-2">info@safeguardforce.in</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-[#0A1931]/95 nav-blur border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : "bg-[#0A1931] border-white/5"}`}>
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 flex items-center justify-between h-[60px] sm:h-[64px] lg:h-[76px]">
          {/* Logo - always visible, optimized for mobile */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 touch-manipulation" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white p-0.5 shrink-0 overflow-hidden">
              <img src="/images/safelogo.jpeg" alt="SAFE Guard FORCE Logo" className="w-full h-full object-contain" />
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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className="text-white text-[12.5px] tracking-[0.14em] uppercase font-semibold hover:text-[#C5A253] transition min-h-[32px] flex items-center">Home</Link>
            <Link href="/about" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">About</Link>

            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition flex items-center gap-1.5 min-h-[32px]">
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition ${servicesOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-white shadow-2xl min-w-[280px] py-2 border-t-[3px] border-[#C5A253]">
                    {services.map((s) => (
                      <Link key={s.href} href={s.href} className="block px-6 py-3 text-[13px] font-medium text-slate-800 hover:bg-slate-50 hover:text-[#0A1931] border-b border-slate-100 last:border-0 transition min-h-[44px] flex items-center">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/industries" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Industries</Link>
            <Link href="/detective-services" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Investigations</Link>
            <Link href="/contact" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition min-h-[32px] flex items-center">Contact</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/contact" className="hidden lg:inline-flex bg-[#C5A253] hover:bg-[#B8941F] active:bg-[#A9893A] text-[#0A1931] text-[11px] tracking-[0.14em] uppercase font-bold px-6 py-3.5 transition items-center gap-2 min-h-[44px] touch-manipulation">
              Get Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:9323581437" className="hidden lg:inline-flex w-10 h-10 border border-white/20 items-center justify-center text-white hover:bg-white hover:text-[#0A1931] transition min-h-[40px] min-w-[40px] touch-manipulation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            {/* Mobile: quick call icon + hamburger */}
            <a href="tel:9323581437" className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 bg-[#C5A253] flex items-center justify-center text-[#0A1931] active:bg-[#B8941F] transition touch-manipulation" aria-label="Call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5 border border-white/20 active:bg-white/10 transition touch-manipulation"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu - improved */}
        {open && (
          <div className="lg:hidden bg-[#0A1931] border-t border-white/10 max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-64px)] overflow-auto overscroll-contain">
            <div className="px-4 py-4 sm:py-6 space-y-1 pb-6">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white font-semibold tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px] touch-manipulation active:text-[#C5A253]">
                Home <span className="text-white/30">→</span>
              </Link>
              <Link href="/about" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px] touch-manipulation active:text-white">
                About Us <span className="text-white/30">→</span>
              </Link>
              <div className="py-2 border-b border-white/10">
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex items-center justify-between py-3 text-left touch-manipulation min-h-[48px]">
                  <span className="text-[#C5A253] tracking-[0.18em] uppercase text-xs font-bold">Services</span>
                  <span className={`w-7 h-7 border border-white/15 flex items-center justify-center text-white/70 transition ${mobileServicesOpen ? "rotate-180 bg-white/5" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                </button>
                {mobileServicesOpen && (
                  <div className="space-y-1 pb-2">
                    {services.map(s => (
                      <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-3 px-3 text-white/85 text-[13px] hover:text-white hover:bg-white/5 active:bg-white/10 transition min-h-[44px] touch-manipulation border-l-2 border-[#C5A253]/50 ml-1">
                        <span className="w-1 h-1 bg-[#C5A253] rounded-full shrink-0" />{s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/industries" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px] touch-manipulation">Industries <span className="text-white/30">→</span></Link>
              <Link href="/detective-services" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px] touch-manipulation">Investigations <span className="text-white/30">→</span></Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="flex items-center justify-between py-3.5 text-white/85 tracking-widest uppercase text-sm border-b border-white/10 min-h-[48px] touch-manipulation">Contact <span className="text-white/30">→</span></Link>
              <div className="pt-5 flex flex-col gap-2.5">
                <a href="tel:9323581437" className="bg-[#C5A253] active:bg-[#B8941F] text-[#0A1931] text-center font-bold tracking-widest uppercase text-sm py-4 min-h-[48px] flex items-center justify-center touch-manipulation">Call 9323581437</a>
                <a href="tel:9136645289" className="bg-white text-[#0A1931] text-center font-bold tracking-widest uppercase text-sm py-3.5 min-h-[48px] flex items-center justify-center touch-manipulation">Call 9136645289</a>
                <a href="https://wa.me/919323581437?text=Hello%20SAFE%20Guard%20FORCE%2C%20I%20would%20like%20to%20discuss%20your%20security%2Ffacility%20management%20services." target="_blank" className="border border-white/20 text-white text-center font-semibold tracking-widest uppercase text-sm py-4 min-h-[48px] flex items-center justify-center gap-2 active:bg-white/10 touch-manipulation">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.05 4.94A9.91 9.91 0 0 0 12.03 2C6.54 2 2.07 6.45 2.07 11.94c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.49 0 9.96-4.46 9.96-9.95 0-2.66-1.04-5.16-2.95-7.05Zm-7.02 15.2h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.26 8.24Zm6.78-6.18c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.25.37-.96 1.21-1.18 1.46-.22.25-.44.28-.81.09-.37-.19-1.57-.58-2.99-1.84-1.1-.98-1.85-2.2-2.06-2.57-.22-.37-.02-.57.16-.76.16-.16.37-.44.56-.66.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.09-.19-.84-2.02-1.15-2.77-.3-.73-.61-.63-.84-.64l-.72-.01c-.25 0-.66.09-1 .47-.34.37-1.31 1.28-1.31 3.12s1.34 3.62 1.53 3.87c.19.25 2.64 4.03 6.4 5.65.89.39 1.59.62 2.13.79.9.29 1.71.25 2.36.15.72-.11 2.2-.9 2.51-1.77.31-.87.31-1.62.22-1.77-.09-.15-.34-.25-.71-.44Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
              <div className="pt-4 text-center text-white/35 text-[11px] leading-relaxed px-4">24/7 Assistance • Trained Personnel • Customized Solutions<br />C 517, Kailash Esplanade, Ghatkopar West, Mumbai</div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
