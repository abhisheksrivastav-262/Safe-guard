import { createClient } from "./supabase/server";
import { fallbackSiteSettings, fallbackHeroSlides, fallbackServices, fallbackIndustries, fallbackNavigation } from "./data/fallback";

export async function getSiteSettingsServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_settings").select("*").limit(1).single();
    if (data) return data;
  } catch {}
  return fallbackSiteSettings;
}
export async function getHeroSlidesServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("hero_slides").select("*").eq("is_active", true).order("slide_order");
    if (data && data.length) return data;
  } catch {}
  return fallbackHeroSlides.filter(s=>s.is_active);
}
export async function getServicesServer(publishedOnly=true) {
  try {
    const supabase = await createClient();
    let q = supabase.from("services").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data } = await q;
    if (data && data.length) return data;
  } catch {}
  return fallbackServices.filter(s=> !publishedOnly || s.is_published);
}
export async function getIndustriesServer(publishedOnly=true) {
  try {
    const supabase = await createClient();
    let q = supabase.from("industries").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data } = await q;
    if (data && data.length) return data;
  } catch {}
  return fallbackIndustries;
}
export async function getNavigationServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("navigation_items").select("*").eq("is_visible", true).order("display_order");
    if (data && data.length) return data;
  } catch {}
  return fallbackNavigation;
}

export async function getTestimonialsServer(publishedOnly = true) {
  try {
    const supabase = await createClient();
    let q = supabase.from("testimonials").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data } = await q;
    if (data && data.length) return data;
  } catch {}
  const { fallbackTestimonials } = await import("./data/fallback");
  return fallbackTestimonials.filter((t: any) => !publishedOnly || t.is_published);
}

export async function getFaqsServer(publishedOnly = true) {
  try {
    const supabase = await createClient();
    let q = supabase.from("faqs").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data } = await q;
    if (data && data.length) return data;
  } catch {}
  const { fallbackFaqs } = await import("./data/fallback");
  return fallbackFaqs.filter((f: any) => !publishedOnly || f.is_published);
}

export async function getAboutContentServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("about_content").select("*").eq("section_key", "about_main").single();
    if (data) return data;
  } catch {}
  const { fallbackAboutContent } = await import("./data/fallback");
  return fallbackAboutContent;
}

export async function getCoreValuesServer() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("core_values").select("*").eq("is_visible", true).order("display_order");
    if (data && data.length) return data;
  } catch {}
  const { fallbackCoreValues } = await import("./data/fallback");
  return fallbackCoreValues;
}

