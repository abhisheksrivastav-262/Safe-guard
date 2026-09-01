import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: faq } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!faq) {
    redirect("/admin/faqs");
  }

  async function updateFaq(formData: FormData) {
    "use server";
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    const category = (formData.get("category") as string) || "General";
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_published = formData.get("is_published") === "on";

    const supabaseClient = await createClient();
    const { error } = await supabaseClient.from("faqs").update({
      question,
      answer,
      category,
      display_order,
      is_published,
      updated_at: new Date().toISOString(),
    }).eq("id", params.id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/faqs");
    revalidatePath("/");
    redirect("/admin/faqs");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Edit FAQ</h1>
          <p className="text-sm text-slate-500">Update question and answer text.</p>
        </div>
        <Link 
          href="/admin/faqs"
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded font-semibold"
        >
          Back
        </Link>
      </div>

      <form action={updateFaq} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Question *</label>
          <input 
            type="text" 
            name="question" 
            defaultValue={faq.question}
            required
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
            <input 
              type="text" 
              name="category" 
              defaultValue={faq.category || "General"}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
            <input 
              type="number" 
              name="display_order" 
              defaultValue={faq.display_order ?? 0}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Answer *</label>
          <textarea 
            name="answer" 
            rows={5}
            defaultValue={faq.answer}
            required
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm leading-relaxed"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={faq.is_published}
              className="w-4 h-4 rounded text-[#C5A253]"
            />
            Published on Website
          </label>
        </div>

        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button 
            type="submit"
            className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
          >
            Update FAQ
          </button>
          <Link 
            href="/admin/faqs"
            className="px-6 py-2.5 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
