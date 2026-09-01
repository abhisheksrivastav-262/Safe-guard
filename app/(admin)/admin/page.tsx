import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch counts from database
  const [
    { count: servicesCount },
    { count: industriesCount },
    { count: enquiriesCount },
    { count: slidesCount },
    { count: testimonialsCount },
    { count: faqsCount },
    { count: appointmentsCount },
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("industries").select("*", { count: "exact", head: true }),
    supabase.from("contact_enquiries").select("*", { count: "exact", head: true }),
    supabase.from("hero_slides").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("appointments").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentEnquiries } = await supabase
    .from("contact_enquiries")
    .select("id, full_name, phone, email, service_required, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total Services", value: servicesCount ?? 12, icon: "🛡️", href: "/admin/services", color: "bg-blue-500/10 text-blue-700" },
    { label: "Industries Served", value: industriesCount ?? 12, icon: "🏢", href: "/admin/industries", color: "bg-amber-500/10 text-amber-700" },
    { label: "Client Enquiries", value: enquiriesCount ?? 0, icon: "📩", href: "/admin/enquiries", color: "bg-emerald-500/10 text-emerald-700" },
    { label: "Hero Slides", value: slidesCount ?? 3, icon: "🖼️", href: "/admin/hero", color: "bg-purple-500/10 text-purple-700" },
    { label: "Client Reviews", value: testimonialsCount ?? 3, icon: "⭐", href: "/admin/testimonials", color: "bg-yellow-500/10 text-yellow-700" },
    { label: "Published FAQs", value: faqsCount ?? 4, icon: "❓", href: "/admin/faqs", color: "bg-indigo-500/10 text-indigo-700" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#0A1931] rounded-xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm border border-[#0A1931]">
        <div>
          <span className="text-[#C5A253] text-xs uppercase font-bold tracking-widest">
            SAFE Guard FORCE Control Panel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Welcome to CMS Dashboard
          </h1>
          <p className="text-white/70 text-sm mt-1 max-w-xl">
            Manage your live website content, services, industries, media uploads, and client enquiries in real-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            target="_blank"
            className="bg-[#C5A253] text-[#0A1931] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#b0904a] transition shadow"
          >
            Live Website ↗
          </Link>
          <a
            href="/api/seed"
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition border border-white/20"
          >
            Sync / Seed Defaults
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((st) => (
          <Link
            key={st.label}
            href={st.href}
            className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hover:border-[#C5A253] transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{st.icon}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${st.color}`}>
                View
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-[#0A1931] group-hover:text-[#C5A253] transition">
                {st.value}
              </div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">
                {st.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-[#0A1931] font-bold text-lg">Recent Client Enquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5">New leads submitted from website contact forms</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-[#C5A253] hover:underline uppercase tracking-wider"
          >
            View All Enquiries →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Client Name</th>
                <th className="px-6 py-4 font-bold">Contact</th>
                <th className="px-6 py-4 font-bold">Service Required</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentEnquiries && recentEnquiries.length > 0 ? (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm font-bold text-[#0A1931]">
                      {enquiry.full_name}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      <a href={`tel:${enquiry.phone}`} className="text-blue-600 font-semibold">{enquiry.phone}</a>
                      {enquiry.email && <span className="text-slate-400 ml-1">({enquiry.email})</span>}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      {enquiry.service_required || "General Consultation"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        enquiry.status === "New" ? "bg-blue-100 text-blue-700" :
                        enquiry.status === "Contacted" ? "bg-yellow-100 text-yellow-700" :
                        enquiry.status === "Converted" ? "bg-emerald-100 text-emerald-700" :
                        "bg-slate-100 text-slate-700"
                      }`}>
                        {enquiry.status || "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
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
