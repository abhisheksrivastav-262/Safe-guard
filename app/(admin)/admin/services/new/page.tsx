import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import ImageUploader from "../../components/ImageUploader";

export default async function NewServicePage() {
  async function createService(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const short_description = formData.get("short_description") as string;
    const detailed_description = formData.get("detailed_description") as string;
    const image_url = formData.get("image_url") as string;
    const order_index = parseInt(formData.get("order_index") as string) || 0;
    
    const supabase = await createClient();
    
    const { error } = await supabase.from("services").insert({
      title,
      slug,
      short_description,
      detailed_description,
      image_url,
      order_index,
    });
    
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    
    revalidatePath("/admin/services");
    redirect("/admin/services");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A1931]">Add New Service</h1>
      </div>
      
      <form action={createService} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
        
        <ImageUploader name="image_url" folder="services" label="Service Image" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] focus:border-transparent outline-none"
              placeholder="e.g. Bouncer Services"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Slug</label>
            <input 
              type="text" 
              name="slug" 
              required
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] focus:border-transparent outline-none"
              placeholder="e.g. bouncer-services"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Order Index</label>
          <input 
            type="number" 
            name="order_index" 
            defaultValue={0}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Short Description</label>
          <textarea 
            name="short_description" 
            rows={2}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] focus:border-transparent outline-none"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Detailed Description</label>
          <textarea 
            name="detailed_description" 
            rows={5}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#C5A253] focus:border-transparent outline-none"
          ></textarea>
        </div>
        
        <div className="pt-4 flex gap-4 border-t border-slate-100">
          <button 
            type="submit"
            className="bg-[#0A1931] text-white px-6 py-2 rounded font-bold hover:bg-[#132D4F] transition"
          >
            Save Service
          </button>
          <a 
            href="/admin/services"
            className="px-6 py-2 rounded font-bold text-slate-600 hover:bg-slate-100 transition border border-slate-200"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
