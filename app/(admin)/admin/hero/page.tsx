import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function HeroPage() {
  const supabase = await createClient();
  const { data: slides } = await supabase
    .from("hero_slides")
    .select("*")
    .order("slide_order", { ascending: true });

  async function deleteSlide(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("hero_slides").delete().eq("id", id);
    revalidatePath("/admin/hero");
    revalidatePath("/");
  }

  async function toggleStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const client = await createClient();
    await client.from("hero_slides").update({ is_active: !current }).eq("id", id);
    revalidatePath("/admin/hero");
    revalidatePath("/");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Hero Slideshow Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Manage background images, headings, and CTAs shown on the homepage carousel.</p>
        </div>
        <Link
          href="/admin/hero/new"
          className="bg-[#C5A253] text-[#0A1931] px-5 py-2.5 rounded font-bold text-sm tracking-wide uppercase hover:bg-[#b0904a] transition shadow-sm"
        >
          + Add Slide
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides && slides.length > 0 ? (
          slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="h-44 bg-slate-900 relative">
                {slide.image_url ? (
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                    No image
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-[#0A1931]/80 backdrop-blur text-white text-xs px-2.5 py-1 rounded font-bold">
                  Order: {slide.slide_order}
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    slide.is_active ? "bg-emerald-500 text-white" : "bg-slate-600 text-slate-200"
                  }`}>
                    {slide.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[#C5A253] text-[10px] uppercase font-bold tracking-widest mb-1">
                    {slide.eyebrow || "Slide Eyebrow"}
                  </div>
                  <h3 className="font-bold text-[#0A1931] text-base leading-snug">
                    {slide.title}
                  </h3>
                  {slide.highlighted_title && (
                    <p className="text-sm font-semibold text-[#C5A253] mt-0.5">
                      {slide.highlighted_title}
                    </p>
                  )}
                  {slide.subtitle && (
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {slide.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <form action={toggleStatus}>
                    <input type="hidden" name="id" value={slide.id} />
                    <input type="hidden" name="current" value={slide.is_active ? "true" : "false"} />
                    <button
                      type="submit"
                      className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded transition"
                    >
                      {slide.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </form>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/hero/${slide.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded transition"
                    >
                      Edit
                    </Link>
                    <form action={deleteSlide}>
                      <input type="hidden" name="id" value={slide.id} />
                      <button
                        type="submit"
                        className="text-xs text-red-600 hover:text-red-800 font-bold px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-sm mb-4">No hero slides found in database.</p>
            <a
              href="/api/seed"
              className="inline-block bg-[#0A1931] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Seed Default Slides
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
