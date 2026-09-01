import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Basic stats fetch
  const { count: servicesCount } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true });

  const { count: enquiriesCount } = await supabase
    .from("contact_enquiries")
    .select("*", { count: "exact", head: true });

  const { count: industriesCount } = await supabase
    .from("industries")
    .select("*", { count: "exact", head: true });

  const { data: recentEnquiries } = await supabase
    .from("contact_enquiries")
    .select("id, full_name, email, service_required, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Services</div>
          <div className="text-3xl font-black text-[#0A1931]">{servicesCount ?? 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Industries</div>
          <div className="text-3xl font-black text-[#0A1931]">{industriesCount ?? 0}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Enquiries</div>
          <div className="text-3xl font-black text-[#0A1931]">{enquiriesCount ?? 0}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-[#0A1931] font-bold text-lg">Recent Enquiries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold">Service</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentEnquiries?.length ? (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-[#0A1931]">{enquiry.full_name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{enquiry.service_required || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        enquiry.status === "New" ? "bg-blue-100 text-blue-700" :
                        enquiry.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(enquiry.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                    No recent enquiries found.
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
