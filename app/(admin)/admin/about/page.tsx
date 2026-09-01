import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import ImageUploader from "../components/ImageUploader";

export default async function AboutCMSPage() {
  const supabase = await createClient();
  const { data: about } = await supabase
    .from("about_content")
    .select("*")
    .eq("section_key", "about_main")
    .single();

  const { data: coreValues } = await supabase
    .from("core_values")
    .select("*")
    .order("display_order", { ascending: true });

  async function updateAboutStory(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const secondary_description = formData.get("secondary_description") as string;
    const image_url = formData.get("image_url") as string;

    const client = await createClient();
    await client.from("about_content").upsert({
      section_key: "about_main",
      title,
      subtitle,
      description,
      secondary_description,
      image_url: image_url || "/images/safeforce.jpeg",
      updated_at: new Date().toISOString(),
    }, { onConflict: "section_key" });

    revalidatePath("/admin/about");
    revalidatePath("/about");
    revalidatePath("/");
  }

  async function addCoreValue(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = (formData.get("icon") as string) || "shield";
    const display_order = parseInt(formData.get("display_order") as string) || 0;

    const client = await createClient();
    await client.from("core_values").insert({
      title,
      description,
      icon,
      display_order,
      is_visible: true,
    });

    revalidatePath("/admin/about");
    revalidatePath("/about");
  }

  async function deleteCoreValue(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const client = await createClient();
    await client.from("core_values").delete().eq("id", id);
    revalidatePath("/admin/about");
    revalidatePath("/about");
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1931]">About Us Content CMS</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage company story, mission statement, leadership background, and core values.
        </p>
      </div>

      <div className="space-y-8">
        {/* Main About Story */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-[#0A1931]">Company Overview & Story</h2>
          </div>

          <form action={updateAboutStory} className="space-y-5">
            <ImageUploader
              name="image_url"
              defaultValue={about?.image_url || "/images/safeforce.jpeg"}
              folder="about"
              label="About Section Main Photo"
            />

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Headline Title</label>
              <input
                type="text"
                name="title"
                defaultValue={about?.title || "Integrated Security & Facility Solutions Under One Roof"}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle / Mission Tagline</label>
              <input
                type="text"
                name="subtitle"
                defaultValue={about?.subtitle || "Disciplined execution, accountable supervision, and customized services for residential, commercial, and industrial premises across Mumbai."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm text-[#C5A253]"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Primary Description</label>
              <textarea
                name="description"
                rows={4}
                defaultValue={about?.description || "SAFE Guard FORCE was established with a singular vision: to deliver unified, high-standard protection and facility operations that property managers, societies, and enterprises can trust implicitly."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Secondary Description</label>
              <textarea
                name="secondary_description"
                rows={3}
                defaultValue={about?.secondary_description || "From ceremonial guarding to technical maintenance, STP operations, and corporate investigations, our teams operate with military precision and customer-first courtesy."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0A1931] text-white px-7 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm uppercase tracking-wide"
            >
              Save Story Content
            </button>
          </form>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-[#0A1931]">Core Values & Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {coreValues && coreValues.length > 0 ? (
              coreValues.map((val) => (
                <div key={val.id} className="border border-slate-200 p-4 rounded-lg bg-slate-50 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#0A1931]">{val.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{val.description}</p>
                    <span className="inline-block text-[10px] text-slate-400 mt-2 font-mono">Order: {val.display_order}</span>
                  </div>
                  <form action={deleteCoreValue}>
                    <input type="hidden" name="id" value={val.id} />
                    <button
                      type="submit"
                      className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1 bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div className="col-span-full text-slate-400 text-xs p-4 text-center">
                No core values added yet.
              </div>
            )}
          </div>

          {/* Add Core Value Form */}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm font-bold text-[#0A1931] mb-3">+ Add Core Value</h3>
            <form action={addCoreValue} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Value Title (e.g. Discipline & Integrity)"
                  className="p-2 border border-slate-300 rounded text-sm bg-white md:col-span-2"
                />
                <input
                  type="number"
                  name="display_order"
                  defaultValue={1}
                  placeholder="Order"
                  className="p-2 border border-slate-300 rounded text-sm bg-white"
                />
              </div>
              <textarea
                name="description"
                rows={2}
                required
                placeholder="Description of this value..."
                className="w-full p-2 border border-slate-300 rounded text-sm bg-white"
              />
              <button
                type="submit"
                className="bg-[#C5A253] text-[#0A1931] px-4 py-2 rounded font-bold text-xs uppercase tracking-wide hover:bg-[#b0904a] transition"
              >
                Add Value
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
