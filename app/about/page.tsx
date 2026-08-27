import PageHero from "../components/PageHero";
import Link from "next/link";

export const metadata = { title: "About Us — SAFE Guard FORCE" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SAFE Guard FORCE"
        title={`Built Around Safety.\nDriven by Professionalism.`}
        subtitle="An integrated security, facility, technical and investigation organization delivering safer, cleaner and efficiently managed premises across Mumbai."
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
      />

      {/* Who we are */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Who We Are</div>
            <h2 className="text-[#0A1931] font-black text-[30px] lg:text-[40px] leading-none tracking-tight">Integrated Services. <span className="italic font-light text-[#C5A253]">One Accountable Partner.</span></h2>
            <p className="text-slate-600 leading-relaxed mt-6">SAFE Guard FORCE / Nationwide Security Group provides integrated security, facility management, housekeeping, gardening, technical maintenance, STP operations, fire & safety and confidential investigation services. We combine disciplined manpower, structured supervision and operational reporting so every property receives consistent, professional coverage.</p>
            <p className="text-slate-500 leading-relaxed mt-4 text-sm">Headquartered at C 517, Kailash Esplanade, Ghatkopar West, Mumbai, we serve residential societies, corporate offices, commercial complexes, hospitals, hotels, schools, factories, warehouses and event venues with customized manpower and operational plans.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-[#F8FAFC] border border-slate-100 p-5">
                <div className="text-[#0A1931] font-bold text-sm">Mumbai-Centric</div>
                <div className="text-slate-500 text-xs mt-1">Deep local operational knowledge with nationwide capability</div>
              </div>
              <div className="bg-[#F8FAFC] border border-slate-100 p-5">
                <div className="text-[#0A1931] font-bold text-sm">Discipline First</div>
                <div className="text-slate-500 text-xs mt-1">Verified, trained and continuously supervised personnel</div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3">
                <img src="/images/safeforce.jpeg" alt="SAFE Guard FORCE uniformed guard" className="w-full h-[380px] object-cover object-top border border-slate-200" />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <div className="bg-white border border-slate-200 p-4 flex flex-col items-center text-center">
                  <img src="/images/safelogo.jpeg" alt="SAFE Guard FORCE shield" className="w-24 h-24 object-contain" />
                  <div className="text-[#0A1931] font-black text-xs tracking-widest uppercase mt-2">SAFE GUARD FORCE</div>
                  <div className="text-[#C5A253] text-[10px] tracking-widest uppercase font-bold">Your Security. Our Priority.</div>
                </div>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Team" className="h-[118px] w-full object-cover" />
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" alt="Facility" className="h-[118px] w-full object-cover" />
              </div>
            </div>
            <div className="bg-[#0A1931] p-4 flex items-center gap-3">
              <img src="/images/safelogo.jpeg" alt="Badge" className="w-10 h-10 bg-white p-1 object-contain" />
              <div className="text-white text-xs leading-tight">
                <span className="text-[#C5A253] font-bold tracking-widest uppercase">Authentic Personnel</span><br />
                <span className="text-white/70">Light blue shirt • Red beret • SAFE belt & patch • White gloves</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-14 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 p-8">
            <div className="w-10 h-10 bg-[#0A1931] flex items-center justify-center text-[#C5A253] mb-5">◆</div>
            <h3 className="text-[#0A1931] font-bold tracking-widest uppercase text-sm">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">To provide reliable, disciplined and professional services that help organizations maintain safer, cleaner and efficiently managed premises.</p>
          </div>
          <div className="bg-[#0A1931] p-8 text-white">
            <div className="w-10 h-10 bg-[#C5A253] flex items-center justify-center text-[#0A1931] mb-5">◆</div>
            <h3 className="font-bold tracking-widest uppercase text-sm">Our Vision</h3>
            <p className="text-white/70 text-sm leading-relaxed mt-3">To become a trusted integrated security and facility-management partner for organizations across India.</p>
          </div>
          <div className="bg-white border border-slate-100 p-8">
            <div className="w-10 h-10 bg-[#0A1931] flex items-center justify-center text-[#C5A253] mb-5">◆</div>
            <h3 className="text-[#0A1931] font-bold tracking-widest uppercase text-sm">Our Commitment</h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">Professional conduct, verified personnel, regular supervision and customized solutions — every site, every day.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-10">
            <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Core Values</div>
            <h2 className="text-[#0A1931] font-black text-[32px] leading-none">Principles That Guide Us</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Integrity", "Honest, ethical and transparent operations."],
              ["Discipline", "Uniformed, punctual and procedure-driven teams."],
              ["Professionalism", "Trained manpower with clear SOPs."],
              ["Accountability", "Supervised execution with reporting."],
              ["Confidentiality", "Discreet handling of sensitive matters."],
              ["Customer Satisfaction", "Responsive support and resolution."],
              ["Safety", "Proactive risk identification & prevention."],
              ["Environmental Responsibility", "Hygiene, STP and sustainable ops."],
            ].map(([t, d]) => (
              <div key={t} className="border border-slate-200 p-6 hover:border-[#C5A253]/40 hover:shadow-md transition">
                <div className="text-[#C5A253] text-xs tracking-[0.18em] uppercase font-bold">{t}</div>
                <div className="text-slate-600 text-sm leading-relaxed mt-2">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Approach */}
      <section className="py-16 bg-[#0A1931] text-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Management Approach</div>
            <h2 className="font-black text-[30px] leading-none">Structured Operations. <span className="italic font-light text-[#C5A253]">Measurable Quality.</span></h2>
            <ul className="mt-8 space-y-4">
              {["Regular site inspections & audits", "Personnel supervision & attendance control", "Quality checks & SLA reporting", "Complaint resolution & escalation matrix", "Vendor coordination & AMC oversight", "Preventive maintenance scheduling"].map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-[#C5A253] text-[#0A1931] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="inline-flex mt-8 bg-[#C5A253] text-[#0A1931] px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold">Discuss Your Requirements</Link>
          </div>
          <div className="relative">
            <img src="/images/safeforce.jpeg" alt="Management approach - guard" className="w-full h-[460px] object-cover object-top border border-white/10" />
            <div className="absolute bottom-4 left-4 right-4 bg-white p-3 flex items-center gap-3">
              <img src="/images/safelogo.jpeg" alt="Logo" className="w-10 h-10 object-contain" />
              <div className="text-[#0A1931] text-xs font-bold tracking-widest uppercase">Nationwide Security Group <span className="text-[#C5A253]">• Mumbai</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
