import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .single();

  async function updateSettings(formData: FormData) {
    "use server";
    const site_name = formData.get("site_name") as string;
    const tagline = formData.get("tagline") as string;
    const primary_phone = formData.get("primary_phone") as string;
    const secondary_phone = formData.get("secondary_phone") as string;
    const whatsapp_number = formData.get("whatsapp_number") as string;
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const postal_code = formData.get("postal_code") as string;
    const google_maps_url = formData.get("google_maps_url") as string;
    const support_hours = formData.get("support_hours") as string;
    const facebook_url = formData.get("facebook_url") as string;
    const instagram_url = formData.get("instagram_url") as string;
    const linkedin_url = formData.get("linkedin_url") as string;
    const maintenance_mode = formData.get("maintenance_mode") === "on";

    const client = await createClient();
    
    // Check if a row exists
    const { data: existing } = await client.from("site_settings").select("id").limit(1).single();

    if (existing) {
      await client.from("site_settings").update({
        site_name,
        tagline,
        primary_phone,
        secondary_phone,
        whatsapp_number,
        email,
        address,
        city,
        state,
        postal_code,
        google_maps_url,
        support_hours,
        facebook_url: facebook_url || "",
        instagram_url: instagram_url || "",
        linkedin_url: linkedin_url || "",
        maintenance_mode,
        updated_at: new Date().toISOString(),
      }).eq("id", existing.id);
    } else {
      await client.from("site_settings").insert({
        site_name,
        tagline,
        primary_phone,
        secondary_phone,
        whatsapp_number,
        email,
        address,
        city,
        state,
        postal_code,
        google_maps_url,
        support_hours,
        facebook_url: facebook_url || "",
        instagram_url: instagram_url || "",
        linkedin_url: linkedin_url || "",
        maintenance_mode,
      });
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1931]">Global Website Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Update phone numbers, WhatsApp, addresses, emails, and operational contact info across Header & Footer.
        </p>
      </div>

      <form action={updateSettings} className="space-y-6">
        {/* Company Identity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-[#0A1931] text-base mb-4 border-b border-slate-100 pb-3">Company Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                name="site_name"
                defaultValue={settings?.site_name || "SAFE Guard FORCE"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                defaultValue={settings?.tagline || "Nationwide Security & Facility Group"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-[#0A1931] text-base mb-4 border-b border-slate-100 pb-3">Contact Numbers & Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Phone Number</label>
              <input
                type="text"
                name="primary_phone"
                defaultValue={settings?.primary_phone || "9323581437"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Phone Number</label>
              <input
                type="text"
                name="secondary_phone"
                defaultValue={settings?.secondary_phone || "9136645289"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (e.g. 919323581437)</label>
              <input
                type="text"
                name="whatsapp_number"
                defaultValue={settings?.whatsapp_number || "919323581437"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-semibold text-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Official Email Address</label>
              <input
                type="email"
                name="email"
                defaultValue={settings?.email || "info@safeguardforce.in"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Physical Address */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-[#0A1931] text-base mb-4 border-b border-slate-100 pb-3">Headquarters Address</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Office Street Address</label>
              <input
                type="text"
                name="address"
                defaultValue={settings?.address || "C 517, Kailash Esplanade, Opp. Shreyash Cinema, LBS Marg"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={settings?.city || "Mumbai"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  defaultValue={settings?.state || "Maharashtra"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Postal / PIN Code</label>
                <input
                  type="text"
                  name="postal_code"
                  defaultValue={settings?.postal_code || "400086"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps URL</label>
              <input
                type="text"
                name="google_maps_url"
                defaultValue={settings?.google_maps_url || "https://maps.google.com/?q=C+517+Kailash+Esplanade+Ghatkopar+West+Mumbai"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Support Hours Tag</label>
              <input
                type="text"
                name="support_hours"
                defaultValue={settings?.support_hours || "24/7 Professional Assistance"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-[#0A1931] text-base mb-4 border-b border-slate-100 pb-3">Social Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facebook URL</label>
              <input
                type="text"
                name="facebook_url"
                defaultValue={settings?.facebook_url || ""}
                placeholder="https://facebook.com/..."
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagram_url"
                defaultValue={settings?.instagram_url || ""}
                placeholder="https://instagram.com/..."
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
              <input
                type="text"
                name="linkedin_url"
                defaultValue={settings?.linkedin_url || ""}
                placeholder="https://linkedin.com/..."
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#0A1931] text-base">Maintenance Mode</h2>
              <p className="text-xs text-slate-500 mt-0.5">Toggle maintenance mode if performing site maintenance.</p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="maintenance_mode"
                defaultChecked={settings?.maintenance_mode || false}
                className="w-5 h-5 rounded text-[#C5A253]"
              />
              <span className="text-sm font-bold text-slate-700">Enable</span>
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#0A1931] text-white px-8 py-3 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide shadow-md"
          >
            Save All Settings
          </button>
        </div>
      </form>
    </div>
  );
}
