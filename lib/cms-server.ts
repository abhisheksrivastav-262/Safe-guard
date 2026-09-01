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
