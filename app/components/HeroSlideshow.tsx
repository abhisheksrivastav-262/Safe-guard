"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/images/safeforce.jpeg",
    alt: "SAFE Guard FORCE trained security personnel",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    alt: "Premium corporate building entrance with security",
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    alt: "Security personnel monitoring CCTV",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    alt: "Facility management team inspection",
  },
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    alt: "Professional housekeeping team",
  },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative h-[88vh] min-h-[560px] max-h-[820px] overflow-hidden bg-[#070F1F]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover ${s.image.includes("safeforce") ? "object-top" : "object-center"} ${i === index ? "kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070F1F] via-[#0A1931]/55 to-[#0A1931]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070F1F]/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C5A253]" />
            <span className="text-[#C5A253] text-[11px] tracking-[0.24em] uppercase font-bold">Integrated Security & Facility Solutions</span>
          </div>

          <h1 className="text-white font-black leading-[0.92] tracking-[-0.03em] text-[40px] lg:text-[64px]">
            SECURITY
            <span className="block font-light italic text-[#C5A253]">THAT PROTECTS.</span>
            <span className="block">SERVICES</span>
            <span className="block font-light italic text-[#C5A253]">THAT PERFORM.</span>
          </h1>

          <p className="text-white/75 text-[15px] lg:text-[17px] leading-relaxed mt-6 max-w-[560px]">
            Professional security, facility management, technical maintenance, STP operations and confidential investigation solutions designed for safer, cleaner and efficiently managed premises.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C5A253] hover:bg-[#D4AF37] text-[#070F1F] px-8 py-4 text-xs tracking-[0.16em] uppercase font-bold transition">
              Get a Free Consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:9323581437" className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white hover:text-[#070F1F] text-white px-8 py-4 text-xs tracking-[0.16em] uppercase font-bold transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call 9323581437
            </a>
          </div>

          <div className="flex items-center gap-2 mt-6 text-white/60 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            24/7 Assistance • Trained Personnel • Customized Solutions
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-6 lg:left-[max(1.5rem,calc((100%-1280px)/2+1.5rem))] z-10 flex items-center gap-3">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all duration-500 ${i === index ? "w-10 bg-[#C5A253]" : "w-6 bg-white/30 hover:bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-white/40 text-xs tracking-widest ml-2">
          0{index + 1} / 0{slides.length}
        </span>
      </div>

      {/* Stats bar - desktop */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-[#070F1F]/70 backdrop-blur">
        <div className="max-w-[1280px] mx-auto px-6 w-full grid grid-cols-4 divide-x divide-white/10">
          {[
            ["24/7", "Professional Assistance"],
            ["Trained", "Verified Personnel"],
            ["Integrated", "Service Solutions"],
            ["Professional", "Management System"],
          ].map(([a, b]) => (
            <div key={a} className="py-5 px-6 flex items-center gap-4">
              <span className="text-[#C5A253] font-black text-lg">{a}</span>
              <span className="text-white/70 text-xs tracking-widest uppercase font-semibold leading-tight">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
