import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function EnquiriesPage() {
  const supabase = await createClient();
  const { data: enquiries } = await supabase
    .from("contact_enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const supabaseClient = await createClient();
    
    await supabaseClient
      .from("contact_enquiries")
      .update({ status })
      .eq("id", id);
      
    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">Contact Enquiries</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Contact Info</th>
                <th className="px-6 py-4 font-bold">Service Required</th>
                <th className="px-6 py-4 font-bold">Message</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enquiries?.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0A1931]">
                    {enquiry.full_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{enquiry.email}</div>
                    <div className="text-slate-400">{enquiry.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {enquiry.service_required || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">
                    {enquiry.message || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      enquiry.status === "New" ? "bg-blue-100 text-blue-700" :
                      enquiry.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form action={updateStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={enquiry.id} />
                      <select 
                        name="status" 
                        defaultValue={enquiry.status}
                        className="text-xs border-slate-300 rounded p-1"
                        onChange={(e) => e.target.form?.requestSubmit()}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </form>
                  </td>
                </tr>
              ))}
              {(!enquiries || enquiries.length === 0) && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
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
