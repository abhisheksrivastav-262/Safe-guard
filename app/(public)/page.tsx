import Link from "next/link";
import HeroSlideshow from "../components/HeroSlideshow";

export const metadata = {
  title: "SAFE Guard FORCE | Integrated Security & Facility Management Mumbai",
  description: "Integrated security, facility management, housekeeping, technical maintenance, STP operations & investigation solutions for residential, commercial and institutional environments. Mumbai • Nationwide Capability.",
};

const services = [
  { title: "Security Services", desc: "Trained & verified guards, supervisors, officers, bouncers, access control and patrolling.", icon: "shield", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { title: "Facility Management", desc: "Society & facility managers, supervisors, inspections and vendor coordination.", icon: "building", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { title: "Housekeeping", desc: "Cleaning, sanitization, waste management and hygiene maintenance.", icon: "sparkles", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80" },
  { title: "Gardening & Landscaping", desc: "Lawn, garden, irrigation, pruning and landscape maintenance.", icon: "leaf", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" },
  { title: "Fire & Safety", desc: "Fire marshals, inspections, evacuation planning and safety training.", icon: "flame", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { title: "Dog Squad", desc: "Trained sniffer dogs & handlers for patrol and detection.", icon: "paw", img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=600&q=80" },
  { title: "Event Security", desc: "Crowd control, VIP protection and venue entry management.", icon: "users", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
  { title: "Technical Maintenance", desc: "Electrical, plumbing, HVAC, civil and infrastructure support.", icon: "wrench", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
  { title: "Pest Control", desc: "Mosquito, termite, cockroach and rodent management.", icon: "bug", img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80" },
  { title: "Reception & Helpdesk", desc: "Receptionists, helpdesk, pantry and office support staff.", icon: "headset", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "Detective Services", desc: "Confidential investigations, verification and surveillance.", icon: "search", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { title: "STP Operations", desc: "Sewage treatment plant operation, maintenance & compliance.", icon: "droplet", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
];

const whyChoose = [
  { title: "Trained & Verified Personnel", desc: "Screened, trained and supervised manpower aligned to your premises and risks." },
  { title: "Experienced Management", desc: "Structured supervision with regular inspections and reporting discipline." },
  { title: "24/7 Assistance", desc: "Prompt response and round-the-clock operational support." },
  { title: "Regular Site Inspections", desc: "Quality checks, audits and continuous improvement cycles." },
  { title: "Customized Packages", desc: "Solutions tailored to property type, occupancy and operational needs." },
  { title: "Integrated Under One Roof", desc: "Security, facility, technical, STP and investigation — one accountable partner." },
];

const industries = [
  { name: "Residential Societies", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80" },
  { name: "Corporate Offices", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { name: "Commercial Complexes", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80" },
  { name: "Malls", img: "https://images.unsplash.com/photo-1519566335946-e6f65f0f84ad?w=600&q=80" },
  { name: "Hospitals", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80" },
  { name: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80" },
  { name: "Schools", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80" },
  { name: "Factories", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
  { name: "Warehouses", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
  { name: "Construction Sites", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { name: "Events", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80" },
  { name: "Institutions", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" },
];

function Icon({ name }: { name: string }) {
  const cls = "w-5 h-5";
  const map: Record<string, React.ReactNode> = {
    shield: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2l7 4v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
    building: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12"/><path d="M9 13h6M9 17h6"/></svg>,
    sparkles: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M19 11l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/><path d="M5 15l1 1.5L7.5 17l-1.5 1-1 1.5-1-1.5L2.5 17l1.5-.5L5 15z"/></svg>,
    leaf: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    flame: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2c0 3-3 5-3 8a3 3 0 0 0 6 0c0-3-3-5-3-8z"/><path d="M9 13a3 3 0 0 0 6 0c0-1.5-1-2.5-1-3"/><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.5-2.5-4.5"/></svg>,
    paw: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3H7v-2a7 7 0 0 1 2-5z"/></svg>,
    users: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    wrench: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    bug: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 8V4"/><path d="M8 12H4"/><path d="M16 12h4"/><path d="M12 16v4"/><rect x="8" y="8" width="8" height="8" rx="4"/><path d="M8 8l-2-2M16 8l2-2M8 16l-2 2M16 16l2 2"/></svg>,
    headset: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 11a9 9 0 1 0 18 0"/><path d="M5 11v4a2 2 0 0 0 2 2h1"/><path d="M17 15h1a2 2 0 0 0 2-2v-4"/><path d="M9 18a3 3 0 0 0 6 0"/></svg>,
    search: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/><path d="M8 11h6"/></svg>,
    droplet: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2l7 7c0 5-3.5 9-7 11-3.5-2-7-6-7-11l7-7z"/><path d="M9 14a3 3 0 1 0 6 0"/></svg>,
  };
  return map[name] || null;
}

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />

      {/* Trust intro */}
      <section className="py-10 sm:py-12 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-px bg-[#C5A253]" /> Trusted Integrated Partner
            </div>
            <h2 className="text-[#0A1931] font-black text-[28px] sm:text-[32px] lg:text-[44px] leading-[0.92] sm:leading-[0.95] tracking-[-0.02em]">
              A Safer, Smarter<br />
              <span className="italic font-light text-[#C5A253]">& Better Managed</span><br />
              Tomorrow.
            </h2>
            <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed mt-4 sm:mt-6">
              SAFE Guard FORCE combines security, facility management, housekeeping, technical services, STP operations and investigation capabilities under one professional organization — delivering disciplined execution, accountable supervision and customized solutions for every premises.
            </p>
            <p className="text-slate-500 text-[13px] sm:text-sm leading-relaxed mt-3 sm:mt-4">
              From residential societies and corporate towers to hospitals, hotels, factories and large events — we protect people, manage properties, maintain operations and ensure cleaner, healthier environments.
            </p>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
              {[
                ["24/7", "Support"],
                ["Pan-Mumbai", "Presence"],
                ["One-Roof", "Solutions"],
              ].map(([a, b]) => (
                <div key={a} className="border border-slate-200 px-2 sm:px-4 py-3 sm:py-4 text-center">
                  <div className="text-[#0A1931] font-black text-xs sm:text-sm">{a}</div>
                  <div className="text-slate-500 text-[10px] sm:text-xs tracking-widest uppercase font-semibold">{b}</div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex mt-6 sm:mt-8 border border-[#0A1931] text-[#0A1931] hover:bg-[#0A1931] hover:text-white active:bg-[#0A1931] active:text-white px-6 sm:px-7 py-3 sm:py-3.5 text-xs tracking-[0.16em] uppercase font-bold transition min-h-[44px] items-center touch-manipulation">
              Discover Our Approach
            </Link>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden border border-slate-200">
              <img src="/images/safeforce.jpeg" alt="SAFE Guard FORCE personnel in ceremonial uniform" className="w-full h-[380px] sm:h-[440px] lg:h-[520px] object-cover object-top" />
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white p-1 sm:p-1.5 shadow-lg">
                <img src="/images/safelogo.jpeg" alt="Badge" className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A1931] p-4 sm:p-6 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[#C5A253] text-[10px] sm:text-xs tracking-widest uppercase font-bold">Trained & Verified Personnel</div>
                  <div className="text-white text-xs sm:text-sm mt-1 leading-tight">C 517, Kailash Esplanade • Ghatkopar West</div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center text-white shrink-0">→</div>
              </div>
            </div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white shadow-xl border border-slate-100 p-6 w-[260px]">
              <div className="text-[#0A1931] font-bold text-sm leading-tight">What We Commit To</div>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                {["Professional Conduct", "Verified Personnel", "Regular Supervision", "Confidentiality"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#C5A253]" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-10 sm:py-12 lg:py-20 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
            <div>
              <div className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-2 sm:mb-3">12 Integrated Capabilities</div>
              <h2 className="text-[#0A1931] font-black text-[26px] sm:text-[30px] lg:text-[42px] leading-none tracking-tight">Core Services</h2>
              <p className="text-slate-500 text-[13px] sm:text-sm mt-2 sm:mt-3 max-w-[560px]">One accountable partner for security, facility, hygiene, technical and investigation needs — customized to your environment.</p>
            </div>
            <Link href="/security-services" className="hidden lg:inline-flex border border-slate-300 hover:border-[#0A1931] hover:bg-[#0A1931] hover:text-white active:bg-[#0A1931] active:text-white text-[#0A1931] px-6 py-3 text-xs tracking-[0.16em] uppercase font-bold transition min-h-[44px] items-center touch-manipulation">View All Services</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {services.map((s) => (
              <div key={s.title} className="group bg-white border border-slate-100 hover:border-[#C5A253]/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-36 overflow-hidden relative">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931]/60 to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 bg-white/95 backdrop-blur flex items-center justify-center text-[#0A1931] group-hover:bg-[#C5A253] group-hover:text-white transition">
                    <Icon name={s.icon} />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-[#0A1931] font-bold text-[13px] tracking-[0.04em] uppercase">{s.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed mt-2 line-clamp-3">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-[#C5A253] text-[11px] tracking-[0.14em] uppercase font-bold">
                    Learn More <span className="group-hover:translate-x-1 transition">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-10 sm:py-12 lg:py-20 bg-[#0A1931] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80)", backgroundSize: "cover" }} />
        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-[640px] mb-6 sm:mb-10">
            <div className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-2 sm:mb-3">Why Organizations Trust Us</div>
            <h2 className="text-white font-black text-[24px] sm:text-[30px] lg:text-[42px] leading-none tracking-tight">Why Organizations Trust <span className="text-[#C5A253] italic font-light">SAFE Guard FORCE</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {whyChoose.map((f, i) => (
              <div key={f.title} className="bg-white/[0.06] backdrop-blur border border-white/10 p-7 hover:bg-white/[0.09] hover:border-[#C5A253]/30 transition">
                <div className="w-10 h-10 bg-[#C5A253] flex items-center justify-center text-[#0A1931] font-black text-sm mb-5">0{i + 1}</div>
                <h3 className="text-white font-bold text-sm tracking-wide">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-10 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-[640px] mx-auto mb-8 sm:mb-12">
            <div className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-2 sm:mb-3">Our Process</div>
            <h2 className="text-[#0A1931] font-black text-[26px] sm:text-[30px] lg:text-[42px] leading-none tracking-tight">How We Work</h2>
            <p className="text-slate-500 text-[13px] sm:text-sm mt-2 sm:mt-3">Disciplined, transparent and operationally accountable — from assessment to continuous improvement.</p>
          </div>

          <div className="relative">
            {/* line desktop */}
            <div className="hidden lg:block absolute top-[34px] left-[5%] right-[5%] h-px bg-slate-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { n: "01", t: "Understand", d: "Understand property, risks and operational requirements." },
                { n: "02", t: "Assess", d: "Conduct site assessment and identify service requirements." },
                { n: "03", t: "Plan", d: "Develop customized manpower and operational plan." },
                { n: "04", t: "Deploy", d: "Deploy trained personnel, supervisors and technical teams." },
                { n: "05", t: "Monitor", d: "Inspections, reporting, quality checks and continuous improvement." },
              ].map((s) => (
                <div key={s.n} className="relative text-center lg:text-left bg-[#F8FAFC] lg:bg-white border border-slate-100 p-6 lg:p-0 lg:border-0">
                  <div className="w-16 h-16 mx-auto lg:mx-0 bg-[#0A1931] text-white flex items-center justify-center font-black text-sm relative z-10 border-4 border-white lg:border-0 shadow-lg">
                    {s.n}
                  </div>
                  <div className="hidden lg:block w-3 h-3 bg-[#C5A253] mx-auto lg:mx-6 mt-3 relative z-10 rotate-45" />
                  <h3 className="text-[#0A1931] font-bold text-sm tracking-widest uppercase mt-4">{s.t}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-2">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-10 sm:py-12 lg:py-20 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
            <div>
              <div className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-2 sm:mb-3">Where We Serve</div>
              <h2 className="text-[#0A1931] font-black text-[26px] sm:text-[30px] lg:text-[42px] leading-none tracking-tight">Industries We Serve</h2>
            </div>
            <Link href="/industries" className="text-[#0A1931] text-xs tracking-[0.16em] uppercase font-bold border-b-2 border-[#C5A253] pb-1 self-start lg:self-auto min-h-[32px] flex items-center touch-manipulation">Explore All Industries →</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {industries.map((ind) => (
              <Link key={ind.name} href="/industries" className="group relative h-[148px] sm:h-[160px] lg:h-[200px] overflow-hidden bg-[#0A1931] touch-manipulation">
                <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 group-active:scale-105 transition duration-700 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F1F] via-[#070F1F]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4">
                  <div className="text-white font-bold text-xs sm:text-sm leading-tight">{ind.name}</div>
                  <div className="text-[#C5A253] text-[9px] sm:text-[10px] tracking-widest uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition hidden sm:block">View Solutions →</div>
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 border border-white/30 flex items-center justify-center text-white/70 group-hover:bg-[#C5A253] group-hover:text-[#0A1931] group-hover:border-[#C5A253] transition text-[10px] sm:text-xs">↗</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Personnel - Real Team */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <img src="/images/safeforce.jpeg" alt="SAFE Guard FORCE guard" className="w-full h-[380px] sm:h-[440px] lg:h-[520px] object-cover object-top border border-slate-200" />
            <div className="absolute -bottom-4 -right-4 hidden lg:flex bg-[#0A1931] border-2 border-white shadow-xl p-5 items-center gap-4">
              <img src="/images/safelogo.jpeg" alt="Logo" className="w-16 h-16 bg-white p-1 object-contain" />
              <div>
                <div className="text-[#C5A253] text-xs tracking-[0.18em] uppercase font-bold">Your Security.</div>
                <div className="text-white font-black text-sm tracking-wide">OUR PRIORITY.</div>
                <div className="text-white/60 text-xs mt-1">Disciplined • Verified • Presentable</div>
              </div>
            </div>
            {/* Mobile badge */}
            <div className="flex lg:hidden bg-[#0A1931] p-3 items-center gap-3 mt-0 border-t-0 border border-slate-200 border-t-0">
              <img src="/images/safelogo.jpeg" alt="Logo" className="w-10 h-10 bg-white p-1 object-contain shrink-0" />
              <div>
                <div className="text-[#C5A253] text-[10px] tracking-[0.16em] uppercase font-bold">Your Security. Our Priority.</div>
                <div className="text-white/70 text-xs">Disciplined • Verified • Presentable</div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.20em] uppercase font-bold mb-2 sm:mb-3">Our Personnel</div>
            <h2 className="text-[#0A1931] font-black text-[24px] sm:text-[28px] lg:text-[38px] leading-none tracking-tight">
              Disciplined Personnel.<br />
              <span className="italic font-light text-[#C5A253]">Professional Appearance.</span>
            </h2>
            <p className="text-slate-600 text-[13px] sm:text-[15px] leading-relaxed mt-4 sm:mt-5">
              Every SAFE Guard FORCE guard is screened, trained and kitted for the premises they protect — from ceremonial bearing to operational vigilance. White gloves, beret with insignia, SAFE-branded belt and disciplined posture reflect the standards we enforce daily.
            </p>
            <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
              {[
                "Uniform discipline & grooming checks",
                "Verified antecedents & supervised deployment",
                "Ceremonial and operational readiness",
                "Client-facing courtesy with firm access control",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 sm:gap-3 text-[13px] sm:text-sm text-slate-700">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#C5A253] text-[#0A1931] flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0">✓</span>
                  <span className="pt-0.5 sm:pt-1">{t}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-6 sm:mt-8">
              <Link href="/security-services" className="bg-[#0A1931] text-white px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-bold min-h-[44px] flex items-center justify-center touch-manipulation active:bg-[#132D4F]">
                View Security Services
              </Link>
              <Link href="/contact" className="border border-slate-300 px-6 py-3.5 text-xs tracking-[0.16em] uppercase font-bold text-[#0A1931] min-h-[44px] flex items-center justify-center touch-manipulation active:bg-slate-50">
                Request Deployment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - mobile grid 2 with borders not divide-x */}
      <section className="bg-[#070F1F] py-8 sm:py-10 lg:py-16 border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y lg:divide-y-0 divide-white/10 lg:divide-x border border-white/10 lg:border-0">
          {[
            ["24/7", "Professional Assistance"],
            ["12+", "Integrated Service Categories"],
            ["100%", "Customized Service Approach"],
            ["360°", "Security & Facility Solutions"],
          ].map(([a, b]) => (
            <div key={a} className="px-4 sm:px-6 py-6 sm:py-0 text-center lg:text-left border-r border-white/10 even:border-r-0 lg:even:border-r lg:border-r-0 lg:first:pl-0 odd:border-r sm:border-r-0">
              <div className="text-[#C5A253] font-black text-[28px] sm:text-[32px] lg:text-[44px] leading-none tracking-tighter">{a}</div>
              <div className="text-white/60 text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase font-semibold mt-2 leading-tight">{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[420px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-[#070F1F] py-10 sm:py-0">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="Corporate building night" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070F1F] via-[#070F1F]/80 sm:via-[#070F1F]/75 to-[#070F1F]/60 sm:to-[#070F1F]/40" />
        <div className="relative z-10 h-full min-h-[420px] sm:min-h-0 max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col justify-center py-8 sm:py-0">
          <div className="max-w-[640px]">
            <h2 className="text-white font-black text-[26px] sm:text-[30px] lg:text-[44px] leading-[0.92] sm:leading-[0.95] tracking-tight">
              Your Property Deserves<br />
              <span className="text-[#C5A253] italic font-light">More Than Basic Security.</span>
            </h2>
            <p className="text-white/75 sm:text-white/70 text-[13px] sm:text-sm leading-relaxed mt-3 sm:mt-4 max-w-[520px]">
              Partner with SAFE Guard FORCE for professional security, facility management, technical maintenance, STP operations and confidential investigation solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-6 sm:mt-8">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C5A253] hover:bg-[#D4AF37] active:bg-[#B8941F] text-[#070F1F] px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-[0.16em] uppercase font-bold transition min-h-[48px] touch-manipulation">
                Request a Consultation →
              </Link>
              <a href="tel:9323581437" className="inline-flex items-center justify-center border border-white/30 hover:bg-white hover:text-[#070F1F] active:bg-white active:text-[#070F1F] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-[0.16em] uppercase font-bold transition min-h-[48px] touch-manipulation">
                Call Now — 9323581437
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
