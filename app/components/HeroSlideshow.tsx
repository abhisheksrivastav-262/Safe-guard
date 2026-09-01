"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getHeroSlides } from "@/lib/cms";
import type { HeroSlide } from "@/lib/types";

const defaultSlides = [
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
  const [slides, setSlides] = useState<any[]>(defaultSlides);
  const [dynamicSlide, setDynamicSlide] = useState<HeroSlide | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    getHeroSlides().then((res) => {
      if (res && res.length > 0) {
        setSlides(res.map((s) => ({
          image: s.image_url,
          alt: s.image_alt || s.title,
          data: s,
        })));
        setDynamicSlide(res[0]);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (slides[index]?.data) {
      setDynamicSlide(slides[index].data);
    }
  }, [index, slides]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const duration = dynamicSlide?.duration_ms || 3500;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), duration);
    return () => clearInterval(t);
  }, [paused, slides.length, dynamicSlide]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setIndex((i) => (i - 1 + slides.length) % slides.length);
      else setIndex((i) => (i + 1) % slides.length);
    }
    touchStartX.current = null;
    setTimeout(() => setPaused(false), 3000);
  };

  return (
    <section
      className="relative h-[78vh] min-h-[540px] sm:min-h-[580px] lg:h-[88vh] lg:min-h-[560px] max-h-[680px] lg:max-h-[820px] overflow-hidden bg-[#070F1F]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover ${s.image.includes("safeforce") ? "object-top object-[center_top]" : "object-center"} ${i === index ? "kenburns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          {/* Mobile needs stronger overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070F1F] via-[#070F1F]/55 lg:via-[#0A1931]/55 to-[#0A1931]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070F1F]/80 via-[#070F1F]/40 to-transparent lg:from-[#070F1F]/70 lg:via-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col justify-center pt-10 sm:pt-0">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
            <span className="w-6 sm:w-8 h-px bg-[#C5A253]" />
            <span className="text-[#C5A253] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.24em] uppercase font-bold">
              {dynamicSlide?.eyebrow || "Integrated Security & Facility Solutions"}
            </span>
          </div>

          <h1 className="text-white font-black leading-[0.90] tracking-[-0.03em] text-[30px] sm:text-[38px] lg:text-[64px]">
            {dynamicSlide?.title ? (
              <>
                {dynamicSlide.title}
                {dynamicSlide.highlighted_title && (
                  <span className="block font-light italic text-[#C5A253]">
                    {dynamicSlide.highlighted_title}
                  </span>
                )}
              </>
            ) : (
              <>
                SECURITY
                <span className="block font-light italic text-[#C5A253]">THAT PROTECTS.</span>
                <span className="block">SERVICES</span>
                <span className="block font-light italic text-[#C5A253]">THAT PERFORM.</span>
              </>
            )}
          </h1>

          <p className="text-white/80 sm:text-white/75 text-[13.5px] sm:text-[15px] lg:text-[17px] leading-relaxed mt-4 sm:mt-6 max-w-[560px] pr-2 sm:pr-0">
            {dynamicSlide?.subtitle || "Professional security, facility management, technical maintenance, STP operations and confidential investigation solutions designed for safer, cleaner and efficiently managed premises."}
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            <Link
              href={dynamicSlide?.primary_cta_url || "/contact"}
              className="inline-flex items-center justify-center gap-2 bg-[#C5A253] hover:bg-[#D4AF37] active:bg-[#B8941F] text-[#070F1F] px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase font-bold transition min-h-[48px] touch-manipulation"
            >
              {dynamicSlide?.primary_cta_text || "Get a Free Consultation"}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <a
              href={dynamicSlide?.secondary_cta_url || "tel:9323581437"}
              className="inline-flex items-center justify-center gap-2 border border-white/40 sm:border-white/30 hover:bg-white hover:text-[#070F1F] active:bg-white active:text-[#070F1F] text-white px-6 sm:px-8 py-3.5 sm:py-4 text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.16em] uppercase font-bold transition min-h-[48px] touch-manipulation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {dynamicSlide?.secondary_cta_text || "Call 9323581437"}
            </a>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-6 text-white/60 text-[11px] sm:text-xs flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            24/7 Assistance • Trained Personnel • Customized Solutions
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-6 lg:left-[max(1.5rem,calc((100%-1280px)/2+1.5rem))] z-10 flex items-center gap-2 sm:gap-3">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 sm:h-1 transition-all duration-500 touch-manipulation min-w-[16px] ${i === index ? "w-8 sm:w-10 bg-[#C5A253]" : "w-5 sm:w-6 bg-white/30 active:bg-white/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-white/40 text-[10px] sm:text-xs tracking-widest ml-1 sm:ml-2">
          0{index + 1} / 0{slides.length}
        </span>
      </div>

      {/* Stats bar - desktop only */}
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
