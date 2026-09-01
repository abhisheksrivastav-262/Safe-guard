import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../components/ImageUploader";

export default async function NewTestimonialPage() {
  async function createTestimonial(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const designation = (formData.get("designation") as string) || null;
    const company = (formData.get("company") as string) || null;
    const content = formData.get("content") as string;
    const image_url = formData.get("image_url") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_published = formData.get("is_published") === "on";

    const supabase = await createClient();
    const { error } = await supabase.from("testimonials").insert({
      name,
      designation,
      company,
      content,
      image_url: image_url || null,
      rating,
      display_order,
      is_published,
    });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    redirect("/admin/testimonials");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Add Testimonial</h1>
          <p className="text-sm text-slate-500">Record a client review or recommendation.</p>
        </div>
        <Link 
          href="/admin/testimonials"
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded font-semibold"
        >
          Back
        </Link>
      </div>

      <form action={createTestimonial} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
        <ImageUploader name="image_url" folder="testimonials" label="Client / Author Photo" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Client Name *</label>
            <input 
              type="text" 
              name="name" 
              required
              placeholder="e.g. Rajesh Sharma"
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Designation / Role</label>
            <input 
              type="text" 
              name="designation" 
              placeholder="e.g. Secretary / Facility Head"
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-1">Company / Society Name</label>
            <input 
              type="text" 
              name="company" 
              placeholder="e.g. Greenwoods Heights CHS"
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Rating (1 to 5 Stars)</label>
            <select
              name="rating"
              defaultValue={5}
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            >
              <option value={5}>★★★★★ (5 Stars)</option>
              <option value={4}>★★★★☆ (4 Stars)</option>
              <option value={3}>★★★☆☆ (3 Stars)</option>
              <option value={2}>★★☆☆☆ (2 Stars)</option>
              <option value={1}>★☆☆☆☆ (1 Star)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Review Content *</label>
          <textarea 
            name="content" 
            rows={4}
            required
            placeholder="Write the review or feedback text here..."
            className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
            <input 
              type="number" 
              name="display_order" 
              defaultValue={1}
              className="w-32 p-2 border border-slate-300 rounded text-sm"
            />
          </div>
          <div className="pt-6">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" name="is_published" defaultChecked className="w-4 h-4 rounded text-[#C5A253]" />
              Published on Website
            </label>
          </div>
        </div>

        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button 
            type="submit"
            className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
          >
            Save Testimonial
          </button>
          <Link 
            href="/admin/testimonials"
            className="px-6 py-2.5 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
