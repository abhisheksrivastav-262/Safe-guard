import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const { data: appointments } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const client = await createClient();
    await client.from("appointments").update({
      status,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    revalidatePath("/admin/appointments");
  }

  async function deleteAppointment(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("appointments").delete().eq("id", id);
    revalidatePath("/admin/appointments");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Consultation & Audit Appointments</h1>
          <p className="text-sm text-slate-500 mt-1">
            Site audit requests and scheduled client security consultations.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Client</th>
                <th className="px-6 py-4 font-bold">Service Type</th>
                <th className="px-6 py-4 font-bold">Schedule</th>
                <th className="px-6 py-4 font-bold">Location</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {appointments && appointments.length > 0 ? (
                appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-[#0A1931]">{app.full_name}</div>
                      <div className="text-xs text-slate-600">
                        <a href={`tel:${app.phone}`} className="text-blue-600 font-semibold">{app.phone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-800">
                      {app.service_type || "Security Audit"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {app.preferred_date ? `${app.preferred_date} (${app.preferred_time || "Morning"})` : "Flexible"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {app.location || app.property_type || "Mumbai"}
                    </td>
                    <td className="px-6 py-4">
                      <form action={updateStatus}>
                        <input type="hidden" name="id" value={app.id} />
                        <select
                          name="status"
                          defaultValue={app.status || "Pending"}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className={`text-xs font-bold px-2 py-1 rounded border outline-none ${
                            app.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            app.status === "Approved" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            app.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </form>
                    </td>
                    <td className="px-6 py-4">
                      <form action={deleteAppointment}>
                        <input type="hidden" name="id" value={app.id} />
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
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-sm">
                    No appointment requests logged yet.
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
