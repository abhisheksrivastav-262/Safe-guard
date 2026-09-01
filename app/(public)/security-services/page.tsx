import PageHero from "../../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Security Services — SAFE Guard FORCE" };

const services = [
  { title: "Security Guard Services", desc: "Trained, verified and uniformed guards for access control, perimeter protection and asset safety.", img: "/images/safeforce.jpeg" },
  { title: "Security Supervisors", desc: "On-site supervision, shift management, reporting and discipline enforcement.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" },
  { title: "Security Officers", desc: "Experienced officers for large premises, escalation handling and client liaison.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80" },
  { title: "Access Control", desc: "Gate management, biometric/RFID coordination and authorized-entry protocols.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { title: "Visitor Management", desc: "Verification, visitor passes, logs and escort protocols.", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" },
  { title: "Vehicle Verification", desc: "Entry/exit logging, parking discipline and anti-tailgating vigilance.", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80" },
  { title: "Patrolling", desc: "Foot and perimeter patrols with scheduled and random checks.", img: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=600&q=80" },
  { title: "CCTV Monitoring", desc: "Control-room vigilance, incident flagging and evidence preservation.", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80" },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security Services"
        title={`Professional Security.\nProactive Protection.`}
        subtitle="Comprehensive manned guarding, supervision and technology-supported security for residential, corporate, industrial and institutional premises."
        image="/images/safeforce.jpeg"
        cta={{ label: "Request Security Assessment", href: "/contact" }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="border border-slate-100 hover:shadow-xl hover:border-[#C5A253]/20 transition overflow-hidden group bg-white">
                <div className="h-40 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5">
                  <h3 className="text-[#0A1931] font-bold text-sm uppercase tracking-wide">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-[#0A1931] font-black text-2xl">Deployment Environments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {[
              ["Residential Society Security", "Gate control, visitor screening, night patrols."],
              ["Corporate Security", "Reception liaison, floor patrols, executive protection."],
              ["Industrial Security", "Perimeter, material gate, contractor verification."],
              ["Warehouse Security", "Inventory gate, CCTV, dock supervision."],
              ["Construction Site Security", "Material, labour and equipment protection overnight."],
              ["Emergency Response", "Incident escalation, first-response and coordination."],
              ["Retail & Mall Security", "Crowd and asset protection, loss prevention support."],
              ["Institutional Security", "Schools, hospitals and campuses — safety first."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border border-slate-100 p-6">
                <div className="text-[#0A1931] font-bold text-sm">{t}</div>
                <div className="text-slate-500 text-sm mt-2">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="bg-[#0A1931] text-white px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold">Request Security Assessment</Link>
            <a href="tel:9323581437" className="border border-slate-300 px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold text-[#0A1931]">Call 9323581437</a>
          </div>
        </div>
      </section>
    </>
  );
}
