import PageHero from "../../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Industries We Serve — SAFE Guard FORCE" };

const items = [
  { title: "Residential Societies", desc: "Security, housekeeping, facility management, gardening, STP and support staff for harmonious living.", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", points: ["Gate & visitor control", "Housekeeping & gardening", "Facility & STP ops"] },
  { title: "Corporate Offices", desc: "Reception, security, housekeeping and technical support for productive workplaces.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", points: ["Front-office & helpdesk", "Access & CCTV", "AMC coordination"] },
  { title: "Commercial Complexes", desc: "High-footfall protocols for lobbies, parking and common areas.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", points: ["Visitor management", "Parking discipline", "Technical upkeep"] },
  { title: "Malls", desc: "Crowd management, asset protection and hygiene at scale.", img: "https://images.unsplash.com/photo-1519566335946-e6f65f0f84ad?w=600&q=80", points: ["Crowd & queue", "Lost-and-found liaison", "Emergency drills"] },
  { title: "Hospitals", desc: "Sensitive, hygienic and disciplined operations for healthcare.", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", points: ["Infection-control cleaning", "Gate & ward security", "Support staff"] },
  { title: "Hotels", desc: "Guest-facing excellence in security, housekeeping and maintenance.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", points: ["Housekeeping", "Luggage & gate", "Technical rooms"] },
  { title: "Schools & Institutions", desc: "Child-safe, vigilant and clean campuses.", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80", points: ["ID & visitor checks", "Patrols & CCTV", "Hygiene"] },
  { title: "Factories", desc: "Perimeter, material and workforce security with technical support.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", points: ["Material gate", "Shift supervision", "Safety audits"] },
  { title: "Warehouses", desc: "Inventory protection and dock discipline.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", points: ["Perimeter & CCTV", "Inward/outward logs", "Night patrols"] },
  { title: "Construction Sites", desc: "Overnight material, equipment and labour management.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", points: ["Material watch", "Labour verification", "Equipment logs"] },
  { title: "Events", desc: "Bouncers, crowd control and discreet VIP protection.", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80", points: ["Entry & stage", "Crowd flow", "Green-room"] },
  { title: "Other Institutions", desc: "Customized integrated solutions for any premises type.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80", points: ["Assessment first", "Custom SOPs", "One partner"] },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title={`Solutions Designed\nAround Your Environment.`}
        subtitle="Every premises has distinct risks, footfall and operational rhythms — we tailor manpower, SOPs and supervision accordingly."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <div key={it.title} className="border border-slate-100 overflow-hidden hover:shadow-xl hover:border-[#C5A253]/20 transition group bg-white">
                <div className="h-48 overflow-hidden relative">
                  <img src={it.img} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute bottom-0 left-0 bg-[#0A1931] px-4 py-2">
                    <span className="text-white text-xs font-bold tracking-widest uppercase">{it.title}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed">{it.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {it.points.map((p) => (
                      <li key={p} className="text-xs text-slate-500 flex gap-2"><span className="text-[#C5A253]">•</span>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#0A1931] p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-[#C5A253] text-xs tracking-[0.18em] uppercase font-bold">Not sure which package fits?</div>
              <div className="text-white font-bold text-lg mt-1">Tell us your property type — we&apos;ll propose a tailored plan.</div>
            </div>
            <Link href="/contact" className="bg-[#C5A253] text-[#0A1931] px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold shrink-0">Request Consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
