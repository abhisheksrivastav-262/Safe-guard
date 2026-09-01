import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  async function deleteTestimonial(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("testimonials").delete().eq("id", id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const client = await createClient();
    await client.from("testimonials").update({ is_published: !current }).eq("id", id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Testimonials & Reviews</h1>
          <p className="text-sm text-slate-500 mt-1">Manage client feedback, ratings, and testimonials shown across the site.</p>
        </div>
        <Link 
          href="/admin/testimonials/new" 
          className="bg-[#C5A253] text-[#0A1931] px-5 py-2.5 rounded font-bold text-sm tracking-wide uppercase hover:bg-[#b0904a] transition shadow-sm"
        >
          + Add Review
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-[#0A1931] text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-500">{item.designation} {item.company ? `• ${item.company}` : ""}</p>
                    </div>
                  </div>
                  <div className="text-amber-400 text-xs font-bold">
                    {"★".repeat(item.rating || 5)}
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-4">
                  "{item.content}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <form action={togglePublish}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="current" value={item.is_published ? "true" : "false"} />
                  <button
                    type="submit"
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.is_published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.is_published ? "Published" : "Draft"}
                  </button>
                </form>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/testimonials/${item.id}`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                  >
                    Edit
                  </Link>
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={item.id} />
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
          <div className="col-span-full bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-500 text-sm mb-4">No testimonials found in database.</p>
            <a
              href="/api/seed"
              className="inline-block bg-[#0A1931] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider"
            >
              Seed Default Reviews
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
