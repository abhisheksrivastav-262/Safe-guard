import PageHero from "../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Housekeeping, Gardening & Hygiene — SAFE Guard FORCE" };

export default function HousekeepingPage() {
  return (
    <>
      <PageHero
        eyebrow="Housekeeping, Gardening & Hygiene"
        title={`Cleaner Spaces.\nHealthier Environments.`}
        subtitle="Professional cleaning, gardening and pest-control services that elevate hygiene, appearance and occupant experience across residential, commercial and institutional premises."
        image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80"
        cta={{ label: "Request Hygiene Assessment", href: "/contact" }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 space-y-16">
          {/* Housekeeping */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" alt="Housekeeping" className="w-full h-[420px] object-cover" />
            <div>
              <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Housekeeping</div>
              <h2 className="text-[#0A1931] font-black text-[28px] leading-none">Professional Cleaning & Sanitization</h2>
              <p className="text-slate-600 leading-relaxed mt-4">Trained housekeeping staff, supervisors and equipment for consistent, checklist-driven cleaning across lobbies, corridors, restrooms, pantries, basements and open areas.</p>
              <ul className="grid grid-cols-2 gap-3 mt-6">
                {["Daily cleaning", "Deep cleaning & sanitization", "Waste segregation & disposal", "Restroom hygiene", "Floor scrubbing & polishing", "Glass & facade coordination"].map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-slate-700"><span className="text-[#C5A253] mt-0.5">◆</span>{x}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gardening */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Gardening & Landscaping</div>
              <h2 className="text-[#0A1931] font-black text-[28px] leading-none">Green Spaces, Beautifully Maintained</h2>
              <p className="text-slate-600 leading-relaxed mt-4">Gardeners and landscaping support for lawns, planters, terraces, podium gardens and common-area greenery — irrigation, health and aesthetics managed.</p>
              <ul className="grid grid-cols-2 gap-3 mt-6">
                {["Lawn mowing & edging", "Plant & planter maintenance", "Pruning & trimming", "Fertilization", "Irrigation & watering schedules", "Seasonal landscaping"].map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-slate-700"><span className="text-[#C5A253] mt-0.5">◆</span>{x}</li>
                ))}
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80" alt="Gardening" className="w-full h-[420px] object-cover order-1 lg:order-2" />
          </div>

          {/* Pest control */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80" alt="Pest control" className="w-full h-[420px] object-cover" />
            <div>
              <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Pest Control & Hygiene</div>
              <h2 className="text-[#0A1931] font-black text-[28px] leading-none">Preventive Hygiene & Pest Management</h2>
              <p className="text-slate-600 leading-relaxed mt-4">Scheduled and on-call pest-control services with safe, approved methods and preventive hygiene practices.</p>
              <ul className="grid grid-cols-2 gap-3 mt-6">
                {["Mosquito control", "Termite control", "Cockroach control", "Rodent control", "Drain & garbage area treatment", "Preventive hygiene audits"].map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-slate-700"><span className="text-[#C5A253] mt-0.5">◆</span>{x}</li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex mt-8 bg-[#0A1931] text-white px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold">Get Hygiene Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
