import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function FaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  async function deleteFaq(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("faqs").delete().eq("id", id);
    revalidatePath("/admin/faqs");
    revalidatePath("/");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const client = await createClient();
    await client.from("faqs").update({ is_published: !current }).eq("id", id);
    revalidatePath("/admin/faqs");
    revalidatePath("/");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">FAQs CMS</h1>
          <p className="text-sm text-slate-500 mt-1">Frequently Asked Questions shown on website pages.</p>
        </div>
        <Link 
          href="/admin/faqs/new" 
          className="bg-[#C5A253] text-[#0A1931] px-5 py-2.5 rounded font-bold text-sm tracking-wide uppercase hover:bg-[#b0904a] transition shadow-sm"
        >
          + Add FAQ
        </Link>
      </div>

      <div className="space-y-4">
        {faqs && faqs.length > 0 ? (
          faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded">
                      {faq.category || "General"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Order: {faq.display_order}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0A1931] text-base">{faq.question}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={faq.id} />
                    <input type="hidden" name="current" value={faq.is_published ? "true" : "false"} />
                    <button
                      type="submit"
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                        faq.is_published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {faq.is_published ? "Published" : "Draft"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/faqs/${faq.id}`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                  >
                    Edit
                  </Link>
                  <form action={deleteFaq}>
                    <input type="hidden" name="id" value={faq.id} />
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-800 text-xs font-bold px-2.5 py-1 bg-red-50 hover:bg-red-100 rounded"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-sm mb-4">No FAQs found in database.</p>
            <a
              href="/api/seed"
              className="inline-block bg-[#0A1931] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Seed Default FAQs
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
