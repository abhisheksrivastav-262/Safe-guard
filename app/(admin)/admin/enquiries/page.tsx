import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const supabase = await createClient();
  let query = supabase
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (searchParams?.status && searchParams.status !== "all") {
    query = query.eq("status", searchParams.status);
  }

  const { data: enquiries } = await query;

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const notes = formData.get("notes") as string;
    const client = await createClient();
    await client.from("contact_enquiries").update({
      status,
      notes: notes || null,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    revalidatePath("/admin/enquiries");
  }

  async function deleteEnquiry(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("contact_enquiries").delete().eq("id", id);
    revalidatePath("/admin/enquiries");
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Client Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time leads submitted via the website contact forms.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "New", "Contacted", "In Progress", "Converted", "Closed"].map((st) => (
          <a
            key={st}
            href={`/admin/enquiries${st === "all" ? "" : `?status=${st}`}`}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition ${
              (searchParams?.status || "all") === st
                ? "bg-[#0A1931] text-white"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {st}
          </a>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Client Info</th>
                <th className="px-6 py-4 font-bold">Requirement</th>
                <th className="px-6 py-4 font-bold">Message</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Received</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enquiries && enquiries.length > 0 ? (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-[#0A1931]">{enq.full_name}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        <a href={`tel:${enq.phone}`} className="hover:underline text-blue-600 font-semibold">{enq.phone}</a>
                        {enq.email && ` • ${enq.email}`}
                      </div>
                      {enq.company_name && (
                        <div className="text-[11px] text-slate-500 font-medium">{enq.company_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-slate-800">{enq.service_required || "General Enquiry"}</div>
                      <div className="text-[11px] text-slate-500">{enq.property_type || enq.location || "Mumbai"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600 max-w-xs leading-relaxed line-clamp-3">
                        {enq.message || "-"}
                      </p>
                      {enq.notes && (
                        <div className="mt-1 text-[11px] bg-amber-50 text-amber-800 p-1.5 rounded border border-amber-200">
                          <span className="font-bold">Note:</span> {enq.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <form action={updateStatus} className="flex items-center gap-2">
                        <input type="hidden" name="id" value={enq.id} />
                        <select
                          name="status"
                          defaultValue={enq.status || "New"}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className={`text-xs font-bold px-2.5 py-1 rounded border outline-none ${
                            enq.status === "New" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            enq.status === "Contacted" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                            enq.status === "In Progress" ? "bg-purple-50 text-purple-700 border-purple-200" :
                            enq.status === "Converted" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <form action={deleteEnquiry}>
                        <input type="hidden" name="id" value={enq.id} />
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800 text-xs font-bold px-2 py-1 bg-red-50 hover:bg-red-100 rounded"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No enquiries found.
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
