import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("display_order", { ascending: true });

  async function deleteService(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabaseClient = await createClient();
    await supabaseClient.from("services").delete().eq("id", id);
    revalidatePath("/admin/services");
    revalidatePath("/");
  }

  async function togglePublish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const supabaseClient = await createClient();
    await supabaseClient.from("services").update({ is_published: !current }).eq("id", id);
    revalidatePath("/admin/services");
    revalidatePath("/");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Services CMS</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add, update, or remove services shown across the website and on service detail pages.
          </p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="bg-[#C5A253] text-[#0A1931] px-5 py-2.5 rounded font-bold text-sm tracking-wide uppercase hover:bg-[#b0904a] transition shadow-sm"
        >
          + Add Service
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Image</th>
                <th className="px-6 py-4 font-bold">Service Name</th>
                <th className="px-6 py-4 font-bold">Slug</th>
                <th className="px-6 py-4 font-bold">Order</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services && services.length > 0 ? (
                services.map((service) => {
                  const img = service.card_image_url || service.hero_image_url || service.image_url;
                  const title = service.name || service.title;
                  return (
                    <tr key={service.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        {img ? (
                          <img src={img} alt={title} className="w-16 h-12 object-cover rounded border border-slate-200" />
                        ) : (
                          <div className="w-16 h-12 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400">No Img</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#0A1931]">
                        {title}
                        {service.short_description && (
                          <p className="text-xs text-slate-500 font-normal line-clamp-1 mt-0.5">{service.short_description}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-600">
                        {service.slug}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">
                        {service.display_order ?? service.order_index ?? 0}
                      </td>
                      <td className="px-6 py-4">
                        <form action={togglePublish}>
                          <input type="hidden" name="id" value={service.id} />
                          <input type="hidden" name="current" value={service.is_published ? "true" : "false"} />
                          <button
                            type="submit"
                            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                              service.is_published ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {service.is_published ? "Published" : "Draft"}
                          </button>
                        </form>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link 
                            href={`/admin/services/${service.id}`}
                            className="text-blue-600 hover:text-blue-800 text-xs font-bold px-2.5 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                          >
                            Edit
                          </Link>
                          <form action={deleteService}>
                            <input type="hidden" name="id" value={service.id} />
                            <button 
                              type="submit" 
                              className="text-red-600 hover:text-red-800 text-xs font-bold px-2.5 py-1 bg-red-50 hover:bg-red-100 rounded"
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <p className="mb-3">No services found in database.</p>
                    <a
                      href="/api/seed"
                      className="inline-block bg-[#0A1931] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider"
                    >
                      Seed Default Services
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
