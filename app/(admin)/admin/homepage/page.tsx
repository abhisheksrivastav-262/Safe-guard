import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import ImageUploader from "../components/ImageUploader";

export default async function HomepageCMSPage() {
  const supabase = await createClient();
  const { data: sections } = await supabase
    .from("homepage_sections")
    .select("*");

  const trustSection = sections?.find((s) => s.section_key === "trust_intro") || null;
  const personnelSection = sections?.find((s) => s.section_key === "personnel") || null;
  const ctaSection = sections?.find((s) => s.section_key === "final_cta") || null;

  async function updateTrustSection(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const eyebrow = formData.get("eyebrow") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const button_text = formData.get("button_text") as string;
    const button_url = formData.get("button_url") as string;

    const client = await createClient();
    await client.from("homepage_sections").upsert({
      section_key: "trust_intro",
      section_type: "trust",
      title,
      subtitle,
      eyebrow,
      description,
      image_url,
      button_text,
      button_url,
      is_visible: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "section_key" });

    revalidatePath("/admin/homepage");
    revalidatePath("/");
  }

  async function updatePersonnelSection(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const eyebrow = formData.get("eyebrow") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;

    const client = await createClient();
    await client.from("homepage_sections").upsert({
      section_key: "personnel",
      section_type: "personnel",
      title,
      subtitle,
      eyebrow,
      description,
      image_url,
      is_visible: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "section_key" });

    revalidatePath("/admin/homepage");
    revalidatePath("/");
  }

  async function updateCtaSection(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const button_text = formData.get("button_text") as string;
    const button_url = formData.get("button_url") as string;
    const image_url = formData.get("image_url") as string;

    const client = await createClient();
    await client.from("homepage_sections").upsert({
      section_key: "final_cta",
      section_type: "cta",
      title,
      subtitle,
      description,
      button_text,
      button_url,
      image_url,
      is_visible: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "section_key" });

    revalidatePath("/admin/homepage");
    revalidatePath("/");
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0A1931]">Homepage Content CMS</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize text, headings, personnel banners, and bottom call-to-actions shown on the main landing page.
        </p>
      </div>

      <div className="space-y-8">
        {/* Trust & Intro Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-[#C5A253] text-[10px] uppercase font-bold tracking-widest">Section 1</span>
            <h2 className="text-lg font-bold text-[#0A1931]">Trusted Integrated Partner (Introduction)</h2>
          </div>

          <form action={updateTrustSection} className="space-y-5">
            <ImageUploader
              name="image_url"
              defaultValue={trustSection?.image_url || "/images/safeforce.jpeg"}
              folder="homepage"
              label="Intro Image"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Eyebrow Tag</label>
                <input
                  type="text"
                  name="eyebrow"
                  defaultValue={trustSection?.eyebrow || "Trusted Integrated Partner"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Highlighted Sub-title</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={trustSection?.subtitle || "& Better Managed"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm text-[#C5A253]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Main Heading</label>
              <input
                type="text"
                name="title"
                defaultValue={trustSection?.title || "A Safer, Smarter Tomorrow."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description Paragraph</label>
              <textarea
                name="description"
                rows={4}
                defaultValue={trustSection?.description || "SAFE Guard FORCE combines security, facility management, housekeeping, technical services, STP operations and investigation capabilities under one professional organization..."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">CTA Button Text</label>
                <input
                  type="text"
                  name="button_text"
                  defaultValue={trustSection?.button_text || "Discover Our Approach"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">CTA Button URL</label>
                <input
                  type="text"
                  name="button_url"
                  defaultValue={trustSection?.button_url || "/about"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#0A1931] text-white px-6 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm"
            >
              Save Introduction Content
            </button>
          </form>
        </div>

        {/* Our Personnel Section */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-[#C5A253] text-[10px] uppercase font-bold tracking-widest">Section 2</span>
            <h2 className="text-lg font-bold text-[#0A1931]">Our Personnel (Guards & Standards)</h2>
          </div>

          <form action={updatePersonnelSection} className="space-y-5">
            <ImageUploader
              name="image_url"
              defaultValue={personnelSection?.image_url || "/images/safeforce.jpeg"}
              folder="homepage"
              label="Personnel Photo"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Eyebrow Tag</label>
                <input
                  type="text"
                  name="eyebrow"
                  defaultValue={personnelSection?.eyebrow || "Our Personnel"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Italic Sub-heading</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={personnelSection?.subtitle || "Professional Appearance."}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm text-[#C5A253]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Main Heading</label>
              <input
                type="text"
                name="title"
                defaultValue={personnelSection?.title || "Disciplined Personnel."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={4}
                defaultValue={personnelSection?.description || "Every SAFE Guard FORCE guard is screened, trained and kitted for the premises they protect — from ceremonial bearing to operational vigilance."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0A1931] text-white px-6 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm"
            >
              Save Personnel Content
            </button>
          </form>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-[#C5A253] text-[10px] uppercase font-bold tracking-widest">Section 3</span>
            <h2 className="text-lg font-bold text-[#0A1931]">Bottom Call-To-Action Banner</h2>
          </div>

          <form action={updateCtaSection} className="space-y-5">
            <ImageUploader
              name="image_url"
              defaultValue={ctaSection?.image_url || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"}
              folder="homepage"
              label="Banner Background Image"
            />

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Heading</label>
              <input
                type="text"
                name="title"
                defaultValue={ctaSection?.title || "Your Property Deserves More Than Basic Security."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={ctaSection?.description || "Partner with SAFE Guard FORCE for professional security, facility management, technical maintenance, STP operations and confidential investigation solutions."}
                className="w-full p-2.5 border border-slate-300 rounded text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Button Text</label>
                <input
                  type="text"
                  name="button_text"
                  defaultValue={ctaSection?.button_text || "Request a Consultation →"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Button Link</label>
                <input
                  type="text"
                  name="button_url"
                  defaultValue={ctaSection?.button_url || "/contact"}
                  className="w-full p-2.5 border border-slate-300 rounded text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#0A1931] text-white px-6 py-2.5 rounded font-bold hover:bg-[#132D4F] transition text-sm"
            >
              Save CTA Content
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
