import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  cta,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="relative h-[420px] lg:h-[520px] overflow-hidden bg-[#070F1F]">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070F1F] via-[#070F1F]/70 to-[#0A1931]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070F1F]/60 to-transparent" />
      <div className="relative z-10 h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#C5A253]" />
            <span className="text-[#C5A253] text-[11px] tracking-[0.24em] uppercase font-bold">{eyebrow}</span>
          </div>
          <h1 className="text-white font-black text-[36px] lg:text-[52px] leading-[0.95] tracking-[-0.02em] whitespace-pre-line">{title}</h1>
          <p className="text-white/70 text-[15px] leading-relaxed mt-4 max-w-[560px]">{subtitle}</p>
          {cta && (
            <Link href={cta.href} className="inline-flex mt-7 bg-[#C5A253] hover:bg-[#D4AF37] text-[#070F1F] px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold transition">
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
