import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../components/ImageUploader";

export default async function EditIndustryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: industry } = await supabase
    .from("industries")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!industry) {
    redirect("/admin/industries");
  }

  async function updateIndustry(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const short_description = (formData.get("short_description") as string) || null;
    const description = (formData.get("description") as string) || null;
    const image_url = formData.get("image_url") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_published = formData.get("is_published") === "on";
    const is_featured = formData.get("is_featured") === "on";

    const supabaseClient = await createClient();
    const { error } = await supabaseClient.from("industries").update({
      name,
      slug,
      short_description,
      description,
      image_url: image_url || industry.image_url,
      display_order,
      is_published,
      is_featured,
      updated_at: new Date().toISOString(),
    }).eq("id", params.id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/industries");
    revalidatePath("/");
    redirect("/admin/industries");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Edit Industry: {industry.name}</h1>
          <p className="text-sm text-slate-500">Update industry info and images.</p>
        </div>
        <Link 
          href="/admin/industries"
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded font-semibold"
        >
          Back
        </Link>
      </div>

      <form action={updateIndustry} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
        <ImageUploader
          name="image_url"
          defaultValue={industry.image_url}
          folder="industries"
          label="Industry Cover Image"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Industry Name *</label>
            <input 
              type="text" 
              name="name" 
              defaultValue={industry.name}
              required
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">URL Slug *</label>
            <input 
              type="text" 
              name="slug" 
              defaultValue={industry.slug}
              required
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
          <input 
            type="number" 
            name="display_order" 
            defaultValue={industry.display_order ?? 0}
            className="w-full p-2.5 border border-slate-300 rounded text-sm max-w-xs"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Short Summary (Shown on Grid Cards)</label>
          <textarea 
            name="short_description" 
            defaultValue={industry.short_description || ""}
            rows={2}
            className="w-full p-2.5 border border-slate-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Description (Full Scope)</label>
          <textarea 
            name="description" 
            defaultValue={industry.description || ""}
            rows={4}
            className="w-full p-2.5 border border-slate-300 rounded text-sm"
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={industry.is_published}
              className="w-4 h-4 rounded text-[#C5A253]"
            />
            Published on Website
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={industry.is_featured}
              className="w-4 h-4 rounded text-[#C5A253]"
            />
            Featured on Homepage
          </label>
        </div>

        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button 
            type="submit"
            className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
          >
            Update Industry
          </button>
          <Link 
            href="/admin/industries"
            className="px-6 py-2.5 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
