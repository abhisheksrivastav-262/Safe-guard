import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../components/ImageUploader";

export default async function NewServicePage() {
  async function createService(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const short_description = (formData.get("short_description") as string) || null;
    const full_description = (formData.get("full_description") as string) || null;
    const hero_title = (formData.get("hero_title") as string) || null;
    const hero_subtitle = (formData.get("hero_subtitle") as string) || null;
    const card_image_url = formData.get("card_image_url") as string;
    const icon = (formData.get("icon") as string) || "shield";
    const display_order = parseInt(formData.get("display_order") as string) || 0;
    const is_published = formData.get("is_published") === "on";
    const is_featured = formData.get("is_featured") === "on";
    
    const supabase = await createClient();
    
    const { error } = await supabase.from("services").insert({
      name,
      slug,
      short_description,
      full_description,
      hero_title,
      hero_subtitle,
      card_image_url: card_image_url || "/images/safeforce.jpeg",
      hero_image_url: card_image_url || "/images/safeforce.jpeg",
      icon,
      display_order,
      is_published,
      is_featured,
    });
    
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    
    revalidatePath("/admin/services");
    revalidatePath("/");
    redirect("/admin/services");
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1931]">Add New Service</h1>
          <p className="text-sm text-slate-500">Create a new capability or security service.</p>
        </div>
        <Link 
          href="/admin/services"
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-200 px-4 py-2 rounded font-semibold"
        >
          Back
        </Link>
      </div>
      
      <form action={createService} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
        <ImageUploader name="card_image_url" folder="services" label="Service Card & Hero Image" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Service Title *</label>
            <input 
              type="text" 
              name="name" 
              required
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-bold"
              placeholder="e.g. Bouncer Services"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">URL Slug (unique) *</label>
            <input 
              type="text" 
              name="slug" 
              required
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm font-mono"
              placeholder="e.g. bouncer-services"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Icon Category</label>
            <select
              name="icon"
              className="w-full p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] outline-none text-sm"
            >
              <option value="shield">🛡️ Shield / Security</option>
              <option value="building">🏢 Building / Facility</option>
              <option value="sparkles">✨ Sparkles / Housekeeping</option>
              <option value="leaf">🌿 Leaf / Gardening</option>
              <option value="flame">🔥 Flame / Fire Safety</option>
              <option value="paw">🐾 Paw / Dog Squad</option>
              <option value="users">👥 Users / Event Security</option>
              <option value="wrench">🔧 Wrench / Technical</option>
              <option value="bug">🦟 Bug / Pest Control</option>
              <option value="headset">🎧 Headset / Helpdesk</option>
              <option value="search">🔍 Search / Detective</option>
              <option value="droplet">💧 Droplet / STP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Display Order</label>
            <input 
              type="number" 
              name="display_order" 
              defaultValue={1}
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Short Description (Card Summary)</label>
          <textarea 
            name="short_description" 
            rows={2}
            placeholder="Brief 1-2 sentence overview of the service..."
            className="w-full p-2.5 border border-slate-300 rounded text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Description (Full Scope)</label>
          <textarea 
            name="full_description" 
            rows={5}
            placeholder="Complete description of procedures, personnel standards, and features..."
            className="w-full p-2.5 border border-slate-300 rounded text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Hero Title (Detail Page)</label>
            <input 
              type="text" 
              name="hero_title" 
              placeholder="e.g. Professional Bouncer & Protection"
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Hero Subtitle</label>
            <input 
              type="text" 
              name="hero_subtitle" 
              placeholder="e.g. Verified bodyguards for VIPs & events"
              className="w-full p-2.5 border border-slate-300 rounded text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input type="checkbox" name="is_published" defaultChecked className="w-4 h-4 rounded text-[#C5A253]" />
            Published on Website
          </label>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input type="checkbox" name="is_featured" defaultChecked className="w-4 h-4 rounded text-[#C5A253]" />
            Featured on Homepage
          </label>
        </div>
        
        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button 
            type="submit"
            className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
          >
            Save Service
          </button>
          <Link 
            href="/admin/services"
            className="px-6 py-2.5 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
