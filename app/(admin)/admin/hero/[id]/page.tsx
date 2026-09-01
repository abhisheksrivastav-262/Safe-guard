import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../components/ImageUploader";

export default async function EditHeroSlidePage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: slide } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!slide) {
    redirect("/admin/hero");
  }

  async function updateSlide(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const highlighted_title = (formData.get("highlighted_title") as string) || null;
    const subtitle = (formData.get("subtitle") as string) || null;
    const eyebrow = (formData.get("eyebrow") as string) || null;
    const image_url = formData.get("image_url") as string;
    const primary_cta_text = (formData.get("primary_cta_text") as string) || "Get a Free Consultation";
    const primary_cta_url = (formData.get("primary_cta_url") as string) || "/contact";
    const secondary_cta_text = (formData.get("secondary_cta_text") as string) || "Call 9323581437";
    const secondary_cta_url = (formData.get("secondary_cta_url") as string) || "tel:9323581437";
    const slide_order = parseInt(formData.get("slide_order") as string) || 1;
    const duration_ms = parseInt(formData.get("duration_ms") as string) || 3000;
    const is_active = formData.get("is_active") === "on";

    const supabaseClient = await createClient();
    const { error } = await supabaseClient.from("hero_slides").update({
      title,
      highlighted_title,
      subtitle,
      eyebrow,
      image_url: image_url || slide.image_url,
      primary_cta_text,
      primary_cta_url,
      secondary_cta_text,
      secondary_cta_url,
      slide_order,
      duration_ms,
      is_active,
      updated_at: new Date().toISOString(),
    }).eq("id", params.id);

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/hero");
    revalidatePath("/");
    redirect("/admin/hero");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Edit Hero Slide</h1>
          <p className="text-sm text-slate-500">Update slide copy, images, and buttons.</p>
        </div>
        <Link
          href="/admin/hero"
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded font-semibold"
        >
          Back
        </Link>
      </div>

      <form action={updateSlide} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
        <ImageUploader name="image_url" defaultValue={slide.image_url} folder="hero" label="Background Image" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Eyebrow / Badge Text</label>
            <input
              type="text"
              name="eyebrow"
              defaultValue={slide.eyebrow || ""}
              placeholder="e.g. Integrated Security & Facility Solutions"
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
            <input
              type="number"
              name="slide_order"
              defaultValue={slide.slide_order}
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Main Heading (Line 1) *</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={slide.title}
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Highlighted Heading (Line 2 - Gold)</label>
          <input
            type="text"
            name="highlighted_title"
            defaultValue={slide.highlighted_title || ""}
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold text-[#C5A253]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle / Description</label>
          <textarea
            name="subtitle"
            rows={3}
            defaultValue={slide.subtitle || ""}
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Primary Button Text</label>
            <input
              type="text"
              name="primary_cta_text"
              defaultValue={slide.primary_cta_text || "Get a Free Consultation"}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Primary Button Link</label>
            <input
              type="text"
              name="primary_cta_url"
              defaultValue={slide.primary_cta_url || "/contact"}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Secondary Button Text</label>
            <input
              type="text"
              name="secondary_cta_text"
              defaultValue={slide.secondary_cta_text || "Call 9323581437"}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Secondary Button Link</label>
            <input
              type="text"
              name="secondary_cta_url"
              defaultValue={slide.secondary_cta_url || "tel:9323581437"}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked={slide.is_active}
            className="w-4 h-4 text-[#C5A253] rounded"
          />
          <label htmlFor="is_active" className="text-sm font-bold text-slate-700">
            Active on live website
          </label>
        </div>

        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
          >
            Update Hero Slide
          </button>
          <Link
            href="/admin/hero"
            className="px-6 py-2.5 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
