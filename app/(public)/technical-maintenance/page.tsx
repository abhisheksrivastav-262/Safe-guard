import PageHero from "../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Technical Maintenance & STP Operations — SAFE Guard FORCE" };

export default function TechnicalPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical Maintenance & STP"
        title={`Technical Expertise\nBehind Efficient\nOperations.`}
        subtitle="Electrical, plumbing, HVAC, civil and STP operations for uninterrupted, compliant and cost-efficient property performance."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
        cta={{ label: "Discuss STP Requirements", href: "/contact" }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Electrical Maintenance", "Panels, lighting, DG sets, cabling and preventive checks.", "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80"],
              ["Plumbing", "Water supply, drainage, pumps and leakage management.", "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80"],
              ["HVAC", "AC plants, AHUs, ventilation and climate control upkeep.", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"],
              ["Civil Maintenance", "Masonry, painting, waterproofing and structural upkeep.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"],
              ["Preventive Maintenance", "Scheduled checklists to avoid breakdowns and extend life.", "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80"],
              ["Infrastructure Support", "Common-area systems, lifts liaison and utility rooms.", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"],
            ].map(([t, d, img]) => (
              <div key={t} className="border border-slate-100 overflow-hidden group hover:shadow-lg transition bg-white">
                <img src={img} alt={t} className="w-full h-44 object-cover group-hover:scale-105 transition duration-700" />
                <div className="p-6">
                  <div className="text-[#0A1931] font-bold text-sm uppercase tracking-wide">{t}</div>
                  <div className="text-slate-500 text-sm mt-2 leading-relaxed">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STP Section */}
      <section className="py-16 bg-[#070F1F] text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">STP Operation & Maintenance</div>
              <h2 className="font-black text-[32px] leading-none">Professional Sewage Treatment Operations</h2>
              <p className="text-white/60 leading-relaxed mt-4">Compliant, well-documented STP operations covering treatment monitoring, electromechanical upkeep, sludge handling and water-quality discipline — aligned to MPCB / environmental norms and society requirements.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {[
                  "Treatment process monitoring",
                  "Pumps & blowers upkeep",
                  "Electrical systems & panels",
                  "Sludge management",
                  "Water quality testing",
                  "Preventive maintenance",
                  "Record keeping & logbooks",
                  "Compliance support",
                ].map((x) => (
                  <div key={x} className="flex gap-2 text-sm text-white/80 bg-white/5 border border-white/10 px-4 py-3">
                    <span className="text-[#C5A253]">✓</span> {x}
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-white/5 border border-white/10 p-5">
                <div className="text-[#C5A253] text-xs tracking-[0.16em] uppercase font-bold">Process Flow</div>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] tracking-widest uppercase font-bold text-white/80">
                  <span className="bg-[#C5A253] text-[#070F1F] px-2 py-1">Inlet</span> → <span className="border border-white/20 px-2 py-1">Treatment</span> → <span className="border border-white/20 px-2 py-1">Monitoring</span> → <span className="border border-white/20 px-2 py-1">Quality Control</span> → <span className="border border-white/20 px-2 py-1">Maintenance</span> → <span className="bg-white text-[#070F1F] px-2 py-1">Compliance</span>
                </div>
              </div>

              <Link href="/contact" className="inline-flex mt-8 bg-[#C5A253] text-[#070F1F] px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold">Discuss STP Requirements</Link>
            </div>
            <div className="space-y-4">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" alt="STP plant" className="w-full h-[380px] object-cover" />
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&q=80" alt="Control panel" className="h-44 w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Pumps" className="h-44 w-full object-cover" />
              </div>
              <div className="bg-[#C5A253] p-5 text-[#070F1F]">
                <div className="font-bold text-sm">Compliance-Focused Operations</div>
                <div className="text-sm opacity-80 mt-1">Logbooks, testing records and preventive schedules maintained for audits and society reporting.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
