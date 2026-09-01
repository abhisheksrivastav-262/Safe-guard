import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function NavigationPage() {
  const supabase = await createClient();
  const { data: navItems } = await supabase
    .from("navigation_items")
    .select("*")
    .order("display_order", { ascending: true });

  async function addNavItem(formData: FormData) {
    "use server";
    const label = formData.get("label") as string;
    const href = formData.get("href") as string;
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_visible = formData.get("is_visible") === "on";

    const client = await createClient();
    await client.from("navigation_items").insert({
      label,
      href,
      display_order,
      is_visible,
    });
    revalidatePath("/admin/navigation");
    revalidatePath("/");
  }

  async function deleteNavItem(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("navigation_items").delete().eq("id", id);
    revalidatePath("/admin/navigation");
    revalidatePath("/");
  }

  async function toggleVisible(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const current = formData.get("current") === "true";
    const client = await createClient();
    await client.from("navigation_items").update({ is_visible: !current }).eq("id", id);
    revalidatePath("/admin/navigation");
    revalidatePath("/");
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">Header Navigation Menu</h1>
        <p className="text-sm text-slate-500 mt-1">
          Control header menu links, URLs, and display order across desktop and mobile menus.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-bold">Menu Label</th>
              <th className="px-6 py-4 font-bold">Link URL</th>
              <th className="px-6 py-4 font-bold">Order</th>
              <th className="px-6 py-4 font-bold">Visibility</th>
              <th className="px-6 py-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {navItems && navItems.length > 0 ? (
              navItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-sm text-[#0A1931]">{item.label}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-600">{item.href}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.display_order}</td>
                  <td className="px-6 py-4">
                    <form action={toggleVisible}>
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="current" value={item.is_visible ? "true" : "false"} />
                      <button
                        type="submit"
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.is_visible ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.is_visible ? "Visible" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-6 py-4">
                    <form action={deleteNavItem}>
                      <input type="hidden" name="id" value={item.id} />
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
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                  No custom navigation items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Nav Item Form */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-base font-bold text-[#0A1931] mb-4">+ Add Navigation Link</h2>
        <form action={addNavItem} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Label</label>
            <input
              type="text"
              name="label"
              required
              placeholder="e.g. Careers"
              className="w-full p-2 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL / Path</label>
            <input
              type="text"
              name="href"
              required
              placeholder="e.g. /careers"
              className="w-full p-2 border border-slate-300 rounded text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
            <input
              type="number"
              name="display_order"
              defaultValue={1}
              className="w-full p-2 border border-slate-300 rounded text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" name="is_visible" defaultChecked className="w-4 h-4" />
              Visible
            </label>
            <button
              type="submit"
              className="bg-[#0A1931] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#132D4F] transition"
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
