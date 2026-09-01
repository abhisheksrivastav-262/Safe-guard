import { createClient } from "@/lib/supabase/server";

export default async function AboutPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">About CMS</h1>
        <button className="bg-[#C5A253] text-[#0A1931] px-4 py-2 rounded text-sm font-bold tracking-wide uppercase hover:bg-[#b0904a] transition">
          + Add New
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-500">
          The About management interface is under construction. 
        </p>
      </div>
    </div>
  );
}
