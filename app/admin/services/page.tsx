import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  async function deleteService(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabaseClient = await createClient();
    await supabaseClient.from("services").delete().eq("id", id);
    revalidatePath("/admin/services");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">Services</h1>
        <Link 
          href="/admin/services/new" 
          className="bg-[#C5A253] text-[#0A1931] px-4 py-2 rounded text-sm font-bold tracking-wide uppercase hover:bg-[#b0904a] transition"
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
                <th className="px-6 py-4 font-bold">Title</th>
                <th className="px-6 py-4 font-bold">Slug</th>
                <th className="px-6 py-4 font-bold">Order</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services?.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    {service.image_url ? (
                      <img src={service.image_url} alt={service.title} className="w-16 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-16 h-12 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-500">No Img</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0A1931]">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {service.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {service.order_index}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link 
                        href={`/admin/services/${service.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteService}>
                        <input type="hidden" name="id" value={service.id} />
                        <button 
                          type="submit" 
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                          onClick={(e) => {
                            if(!confirm('Are you sure you want to delete this service?')) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {(!services || services.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No services found.
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
