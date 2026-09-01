"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteSettings } from "@/lib/cms";
import type { SiteSettings } from "@/lib/types";

export default function Footer() {
  const [s, setS] = useState<SiteSettings | null>(null);
  useEffect(()=>{ getSiteSettings().then(setS).catch(()=>{});},[]);
  const primaryPhone = s?.primary_phone || "9323581437";
  const secondaryPhone = s?.secondary_phone || "9136645289";
  const address = s?.address || "C 517, Kailash Esplanade";
  const maps = s?.google_maps_url || "https://maps.google.com/?q=C+517+Kailash+Esplanade+Ghatkopar+West+Mumbai";
  const logo = s?.logo_url || "/images/safelogo.jpeg";
  return (
    <footer className="bg-[#070F1F] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[#C5A253] text-[11px] tracking-[0.24em] uppercase font-bold mb-2">Ready to Secure Your Premises?</div>
            <div className="text-white text-xl lg:text-2xl font-bold tracking-tight">Partner with India&apos;s Integrated Security & Facility Experts</div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="bg-[#C5A253] hover:bg-[#D4AF37] text-[#070F1F] px-7 py-3.5 text-xs tracking-[0.14em] uppercase font-bold transition">Request Consultation</Link>
            <a href={`tel:${primaryPhone}`} className="border border-white/20 hover:bg-white hover:text-[#070F1F] px-7 py-3.5 text-xs tracking-[0.14em] uppercase font-bold transition">Call Now</a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white p-0.5 shrink-0 overflow-hidden">
                <img src={logo} alt="SAFE Guard FORCE" className="w-full h-full object-contain" />
              </div>
              <div className="leading-none">
                <div className="text-white font-black tracking-widest text-sm">SAFE GUARD FORCE</div>
                <div className="text-[#C5A253] text-[9px] tracking-[0.28em] uppercase font-semibold">{s?.tagline || "Nationwide Security Group"}</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Integrated security, facility management, technical and investigation solutions. Professional, disciplined and reliable services for safer, cleaner and efficiently managed premises.
            </p>
            <div className="flex gap-2">
              {[
                {href: s?.facebook_url || "#", icon:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"},
                {href: s?.linkedin_url || "#", icon:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"},
                {href: s?.instagram_url || "#", icon:" rect"},
              ].map((_,i)=>(
                <a key={i} href={_.href} target="_blank" className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/60 hover:text-[#C5A253] hover:border-[#C5A253]/30 transition cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white text-xs tracking-[0.2em] uppercase font-bold mb-5 flex items-center gap-2"><span className="w-6 h-px bg-[#C5A253]" /> Services</div>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Security Services", "/security-services"],
                ["Facility Management", "/facility-management"],
                ["Housekeeping & Gardening", "/housekeeping"],
                ["Fire & Safety", "/fire-safety"],
                ["Technical Maintenance", "/technical-maintenance"],
                ["STP Operations", "/technical-maintenance"],
                ["Detective Services", "/detective-services"],
              ].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-white/60 hover:text-[#C5A253] transition flex items-center gap-2"><span className="w-1 h-1 bg-[#C5A253]/60 rounded-full" />{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white text-xs tracking-[0.2em] uppercase font-bold mb-5 flex items-center gap-2"><span className="w-6 h-px bg-[#C5A253]" /> Industries</div>
            <ul className="space-y-2.5 text-sm">
              {["Residential Societies", "Corporate Offices", "Commercial Complexes", "Healthcare & Hospitals", "Hospitality & Hotels", "Industrial & Warehouses", "Institutions & Schools", "Events & Venues"].map((i) => (
                <li key={i}><Link href="/industries" className="text-white/60 hover:text-[#C5A253] transition flex items-center gap-2"><span className="w-1 h-1 bg-[#C5A253]/60 rounded-full" />{i}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white text-xs tracking-[0.2em] uppercase font-bold mb-5 flex items-center gap-2"><span className="w-6 h-px bg-[#C5A253]" /> Contact</div>
            <div className="space-y-4">
              <div>
                <div className="text-white/40 text-[11px] tracking-widest uppercase mb-1">Call Us 24/7</div>
                <a href={`tel:${primaryPhone}`} className="block text-white font-bold text-lg hover:text-[#C5A253] transition">{primaryPhone}</a>
                <a href={`tel:${secondaryPhone}`} className="block text-white font-bold text-lg hover:text-[#C5A253] transition">{secondaryPhone}</a>
              </div>
              <div>
                <div className="text-white/40 text-[11px] tracking-widest uppercase mb-1">Visit Us</div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {address}<br />
                  {s?.city ? `${s.city}` : "Ghatkopar West, Mumbai"} — {s?.postal_code || "400086"}
                </p>
                <a href={maps} target="_blank" className="inline-flex mt-3 text-[#C5A253] text-xs tracking-widest uppercase font-bold hover:underline gap-1 items-center">
                  Get Directions <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
              {s?.email && <div className="text-white/40 text-xs">{s.email}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 py-5">
          <p className="text-white/30 text-[11px] leading-relaxed">
            Services are provided subject to applicable laws, regulations, client requirements and operational feasibility. Investigation and information-gathering services are conducted professionally, discreetly and only through lawful means.
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.06] bg-[#050C1A]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-white/40">
            © {new Date().getFullYear()} {s?.site_name || "SAFE Guard FORCE"} / {s?.tagline || "Nationwide Security Group"}. All Rights Reserved.
          </div>
          <div className="flex gap-6 text-white/40">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
