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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
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
            <a href="tel:9323581437" className="flex items-center gap-2 hover:text-[#C5A253] transition">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              9323581437
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:9136645289" className="hover:text-[#C5A253] transition">9136645289</a>
            <a href="mailto:info@safeguardforce.in" className="hidden xl:inline text-white/50 hover:text-white transition normal-case tracking-normal text-xs ml-2">info@safeguardforce.in</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "bg-[#0A1931]/95 nav-blur border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-0" : "bg-[#0A1931] border-white/5 py-0"}`}>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 flex items-center justify-between h-[68px] lg:h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 lg:w-11 lg:h-11 bg-white p-0.5 shrink-0 overflow-hidden">
              <img src="/images/safelogo.jpeg" alt="SAFE Guard FORCE Logo" className="w-full h-full object-contain" />
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-1">
                <span className="text-white font-black text-[18px] lg:text-[19px] tracking-[0.04em]">SAFE</span>
                <span className="text-[#C5A253] font-black text-[18px] lg:text-[19px] tracking-[0.04em]">GUARD</span>
                <span className="text-white font-light text-[18px] tracking-[0.08em] ml-1">FORCE</span>
              </div>
              <div className="text-[#C5A253] text-[9px] tracking-[0.32em] uppercase font-semibold mt-0.5">Nationwide Security Group</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className="text-white text-[12.5px] tracking-[0.14em] uppercase font-semibold hover:text-[#C5A253] transition">Home</Link>
            <Link href="/about" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition">About</Link>

            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition flex items-center gap-1.5">
                Services
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition ${servicesOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                  <div className="bg-white shadow-2xl min-w-[280px] py-2 border-t-[3px] border-[#C5A253]">
                    {services.map((s) => (
                      <Link key={s.href} href={s.href} className="block px-6 py-3 text-[13px] font-medium text-slate-800 hover:bg-slate-50 hover:text-[#0A1931] border-b border-slate-100 last:border-0 transition">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/industries" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition">Industries</Link>
            <Link href="/detective-services" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition">Investigations</Link>
            <Link href="/contact" className="text-white/80 text-[12.5px] tracking-[0.14em] uppercase font-medium hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:inline-flex bg-[#C5A253] hover:bg-[#B8941F] text-[#0A1931] text-[11px] tracking-[0.14em] uppercase font-bold px-6 py-3.5 transition items-center gap-2">
              Get Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:9323581437" className="hidden lg:inline-flex w-10 h-10 border border-white/20 items-center justify-center text-white hover:bg-white hover:text-[#0A1931] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            {/* Mobile hamburger */}
            <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-white/20">
              <span className={`block w-5 h-0.5 bg-white transition ${open ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-white transition ${open ? "-rotate-45 -translate-y-1" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-[#0A1931] border-t border-white/10 max-h-[calc(100vh-68px)] overflow-auto">
            <div className="px-4 py-6 space-y-1">
              <Link href="/" onClick={() => setOpen(false)} className="block py-3 text-white font-semibold tracking-widest uppercase text-sm border-b border-white/10">Home</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="block py-3 text-white/80 tracking-widest uppercase text-sm border-b border-white/10">About Us</Link>
              <div className="py-3 border-b border-white/10">
                <div className="text-[#C5A253] tracking-[0.18em] uppercase text-xs font-bold mb-3">Services</div>
                <div className="space-y-1">
                  {services.map(s => (
                    <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="block py-2 text-white/80 text-sm hover:text-white">{s.label}</Link>
                  ))}
                </div>
              </div>
              <Link href="/industries" onClick={() => setOpen(false)} className="block py-3 text-white/80 tracking-widest uppercase text-sm border-b border-white/10">Industries</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="block py-3 text-white/80 tracking-widest uppercase text-sm border-b border-white/10">Contact</Link>
              <div className="pt-6 flex flex-col gap-3">
                <a href="tel:9323581437" className="bg-[#C5A253] text-[#0A1931] text-center font-bold tracking-widest uppercase text-sm py-4">Call 9323581437</a>
                <a href="https://wa.me/919323581437?text=Hello%20SAFE%20Guard%20FORCE%2C%20I%20would%20like%20to%20discuss%20your%20security%2Ffacility%20management%20services." target="_blank" className="border border-white/20 text-white text-center font-semibold tracking-widest uppercase text-sm py-4 flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.05 4.94A9.91 9.91 0 0 0 12.03 2C6.54 2 2.07 6.45 2.07 11.94c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.78 1.22h.01c5.49 0 9.96-4.46 9.96-9.95 0-2.66-1.04-5.16-2.95-7.05Zm-7.02 15.2h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.26 8.24Zm6.78-6.18c-.37-.19-2.2-1.09-2.54-1.21-.34-.12-.59-.19-.84.19-.25.37-.96 1.21-1.18 1.46-.22.25-.44.28-.81.09-.37-.19-1.57-.58-2.99-1.84-1.1-.98-1.85-2.2-2.06-2.57-.22-.37-.02-.57.16-.76.16-.16.37-.44.56-.66.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.09-.19-.84-2.02-1.15-2.77-.3-.73-.61-.63-.84-.64l-.72-.01c-.25 0-.66.09-1 .47-.34.37-1.31 1.28-1.31 3.12s1.34 3.62 1.53 3.87c.19.25 2.64 4.03 6.4 5.65.89.39 1.59.62 2.13.79.9.29 1.71.25 2.36.15.72-.11 2.2-.9 2.51-1.77.31-.87.31-1.62.22-1.77-.09-.15-.34-.25-.71-.44Z"/></svg>
                  WhatsApp Us
                </a>
              </div>
              <div className="pt-4 text-center text-white/40 text-xs">24/7 Assistance • Trained Personnel • Customized Solutions</div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
