import PageHero from "../../components/PageHero";
import Link from "next/link";
import { getIndustriesServer } from "@/lib/cms-server";

export const metadata = { title: "Industries We Serve — SAFE Guard FORCE" };

export default async function IndustriesPage() {
  const industries = await getIndustriesServer(true);

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
            {industries.map((it: any) => {
              const name = it.name || it.title;
              const desc = it.short_description || it.description || it.desc;
              const img = it.image_url || it.img || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80";

              return (
                <div key={name} className="border border-slate-100 overflow-hidden hover:shadow-xl hover:border-[#C5A253]/20 transition group bg-white">
                  <div className="h-48 overflow-hidden relative">
                    <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute bottom-0 left-0 bg-[#0A1931] px-4 py-2">
                      <span className="text-white text-xs font-bold tracking-widest uppercase">{name}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link href="/contact" className="text-[#C5A253] text-xs font-bold uppercase tracking-wider hover:underline">
                        Get Proposal →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
