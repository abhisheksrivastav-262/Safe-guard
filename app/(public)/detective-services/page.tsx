import PageHero from "../components/PageHero";
import Link from "next/link";

export const metadata = { title: "Detective & Investigation Services — SAFE Guard FORCE" };

export default function DetectivePage() {
  return (
    <>
      <PageHero
        eyebrow="Confidential Investigation"
        title={`Confidential\nInformation.\nProfessional\nInvestigation.`}
        subtitle="Discreet, lawful and professionally conducted verification, surveillance and corporate investigations — with strict confidentiality."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        cta={{ label: "Request Confidential Consultation", href: "/contact" }}
      />

      <div className="bg-[#C5A253] text-center py-3 text-[#070F1F] text-xs tracking-[0.12em] uppercase font-bold px-6">
        All services are conducted professionally, discreetly and in accordance with applicable laws — only through lawful means.
      </div>

      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              ["Background Verification", "Identity, address, education and reference checks through lawful sources."],
              ["Employee Verification", "Pre- and post-employment screening for corporate and domestic staff."],
              ["Matrimonial Investigations", "Discreet verification conducted with sensitivity and confidentiality."],
              ["Surveillance", "Lawful observation and reporting — no illegal tracking or intrusion."],
              ["Missing-Person Investigations", "Information gathering and coordination within legal boundaries."],
              ["Fraud Detection", "Document, transaction and activity review for anomalies."],
              ["Corporate Investigations", "Internal matters, leakage and breach inquiries — lawful methods only."],
              ["Asset Verification", "Ownership and asset information via lawful public and provided sources."],
              ["Due Diligence", "Partner, vendor and investment background research."],
              ["Information Gathering", "Focused, lawful collection and verification of information."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border border-slate-200 p-7 hover:border-[#C5A253]/40 hover:shadow-md transition">
                <div className="w-8 h-8 bg-[#0A1931] flex items-center justify-center text-[#C5A253] text-xs">◆</div>
                <h3 className="text-[#0A1931] font-bold text-sm mt-4 uppercase tracking-wide">{t}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#070F1F] text-white">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[#C5A253] text-[11px] tracking-[0.20em] uppercase font-bold mb-3">Discretion & Confidentiality</div>
            <h2 className="font-black text-[30px] leading-none">Your Information Stays <span className="italic font-light text-[#C5A253]">Confidential.</span></h2>
            <p className="text-white/60 leading-relaxed mt-4">Client information and investigation matters are handled professionally and confidentially, subject to applicable law. We operate on need-to-know, secure handling and lawful-methods-only principles — no hacking, stalking, unauthorized surveillance or unlawful data access.</p>
            <ul className="mt-6 space-y-2 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-[#C5A253]">▸</span> Confidential consultations — in person or via secure call</li>
              <li className="flex gap-2"><span className="text-[#C5A253]">▸</span> Lawful methods only — documented and defensible</li>
              <li className="flex gap-2"><span className="text-[#C5A253]">▸</span> No guarantee of outcome — only professional effort and reporting</li>
            </ul>
            <Link href="/contact" className="inline-flex mt-8 bg-[#C5A253] text-[#070F1F] px-7 py-3.5 text-xs tracking-[0.16em] uppercase font-bold">Request Confidential Consultation</Link>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Investigation" className="w-full h-[460px] object-cover opacity-90" />
            <div className="absolute inset-0 border border-[#C5A253]/20 m-4 pointer-events-none" />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-slate-500 text-xs leading-relaxed max-w-[880px] mx-auto">
            Disclaimer: Services are provided subject to applicable laws, regulations, client requirements and operational feasibility. Investigation and information-gathering services are conducted professionally, discreetly and only through lawful means. We do not facilitate illegal surveillance, hacking, stalking or unauthorized data access.
          </p>
        </div>
      </section>
    </>
  );
}
