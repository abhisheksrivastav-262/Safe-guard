import PageHero from "../../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Facility Management — SAFE Guard FORCE" };

export default function FacilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Facility Management"
        title={`Complete Facility\nManagement. One\nResponsible Partner.`}
        subtitle="End-to-end operations for societies, corporate offices, commercial complexes and institutions — people, property, operations, quality and reporting."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        cta={{ label: "Discuss Facility Requirements", href: "/contact" }}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-[#0A1931] font-black text-[28px] leading-none">What We Manage</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[
                ["Facility Managers", "Day-to-day operations, budgeting support and stakeholder reporting."],
                ["Society Managers", "Resident liaison, AGM support, compliance and documentation."],
                ["Supervisors", "Shift supervision, checklist enforcement and on-site discipline."],
                ["Daily Operations", "Opening/closing, utilities, common-area upkeep."],
                ["Staff Administration", "Attendance, deployment, training and grooming."],
                ["Quality Control", "SLA checks, audits and corrective actions."],
                ["Complaint Resolution", "Ticketing, escalation matrix and closure reporting."],
                ["Vendor Coordination", "AMC, procurement and service follow-ups."],
                ["Resident Support", "Helpdesk, move-in/out and facility bookings."],
                ["Site Inspections", "Scheduled inspections with photo and written reports."],
              ].map(([t, d]) => (
                <div key={t} className="border border-slate-100 p-6 hover:border-[#C5A253]/30 transition bg-[#F8FAFC]">
                  <div className="text-[#0A1931] font-bold text-sm uppercase tracking-wide">{t}</div>
                  <div className="text-slate-500 text-sm mt-2 leading-relaxed">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" alt="Facility manager" className="w-full h-[320px] object-cover" />
            <div className="bg-[#0A1931] p-7 text-white">
              <div className="text-[#C5A253] text-xs tracking-[0.18em] uppercase font-bold">Operating Model</div>
              <div className="grid grid-cols-5 gap-2 mt-4 text-center">
                {["People", "Property", "Operations", "Quality", "Reporting"].map((x) => (
                  <div key={x} className="bg-white/10 py-3">
                    <div className="text-[#C5A253] font-black text-sm">{x[0]}</div>
                    <div className="text-white text-[10px] tracking-widest uppercase mt-1">{x}</div>
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-xs leading-relaxed mt-4">Integrated dashboard mindset: manpower, assets, SOPs, audits and transparent reporting in one loop.</p>
            </div>
            <Link href="/contact" className="block text-center bg-[#C5A253] text-[#0A1931] py-4 text-xs tracking-[0.16em] uppercase font-bold">Discuss Your Facility Requirements</Link>
          </div>
        </div>
      </section>
    </>
  );
}
