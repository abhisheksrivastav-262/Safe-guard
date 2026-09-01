import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function SeoPage() {
  const supabase = await createClient();
  const { data: seoList } = await supabase
    .from("page_seo")
    .select("*");

  async function updateSeo(formData: FormData) {
    "use server";
    const page_key = formData.get("page_key") as string;
    const meta_title = formData.get("meta_title") as string;
    const meta_description = formData.get("meta_description") as string;
    const canonical_url = formData.get("canonical_url") as string;

    const client = await createClient();
    await client.from("page_seo").upsert({
      page_key,
      meta_title,
      meta_description,
      canonical_url: canonical_url || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "page_key" });

    revalidatePath("/admin/seo");
    revalidatePath("/");
  }

  const defaultPages = [
    { key: "home", name: "Homepage" },
    { key: "about", name: "About Us Page" },
    { key: "security-services", name: "Security Services Page" },
    { key: "facility-management", name: "Facility Management Page" },
    { key: "contact", name: "Contact Page" },
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">SEO & Meta Tag Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize search engine title tags and meta descriptions for individual website pages.
        </p>
      </div>

      <div className="space-y-6">
        {defaultPages.map((p) => {
          const item = seoList?.find((s) => s.page_key === p.key);
          return (
            <div key={p.key} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <h2 className="font-bold text-[#0A1931] text-base">{p.name}</h2>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{p.key}</span>
              </div>

              <form action={updateSeo} className="space-y-4">
                <input type="hidden" name="page_key" value={p.key} />

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Browser Title (Meta Title)</label>
                  <input
                    type="text"
                    name="meta_title"
                    defaultValue={item?.meta_title || `SAFE Guard FORCE — ${p.name}`}
                    className="w-full p-2.5 border border-slate-300 rounded text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    name="meta_description"
                    rows={2}
                    defaultValue={item?.meta_description || ""}
                    placeholder="Search snippet summary shown on Google..."
                    className="w-full p-2.5 border border-slate-300 rounded text-sm leading-relaxed"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0A1931] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#132D4F] transition"
                  >
                    Save SEO
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
