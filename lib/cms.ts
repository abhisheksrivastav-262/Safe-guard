import { createClient as createBrowser } from "./supabase/client";
import { fallbackSiteSettings, fallbackHeroSlides, fallbackServices, fallbackIndustries, fallbackNavigation } from "./data/fallback";
import type { SiteSettings, HeroSlide, Service, Industry, NavigationItem } from "./types";

function isBrowser() { return typeof window !== "undefined"; }

function getLocalOverride<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const v = localStorage.getItem(`cms_${key}`);
    return v ? JSON.parse(v) as T : null;
  } catch { return null; }
}

// Site settings
export async function getSiteSettings(): Promise<SiteSettings> {
  const local = getLocalOverride<SiteSettings>("site_settings");
  if (local) return local;
  try {
    const supabase = createBrowser();
    const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
    if (!error && data) return data as SiteSettings;
  } catch {}
  return fallbackSiteSettings;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const local = getLocalOverride<HeroSlide[]>("hero_slides");
  if (local) return local.filter(s=>s.is_active).sort((a,b)=>a.slide_order-b.slide_order);
  try {
    const supabase = createBrowser();
    const { data, error } = await supabase.from("hero_slides").select("*").eq("is_active", true).order("slide_order");
    if (!error && data && data.length) return data as HeroSlide[];
  } catch {}
  return fallbackHeroSlides.filter(s=>s.is_active);
}

export async function getAllHeroSlidesAdmin(): Promise<HeroSlide[]> {
  const local = getLocalOverride<HeroSlide[]>("hero_slides");
  if (local) return local.sort((a,b)=>a.slide_order-b.slide_order);
  try {
    const supabase = createBrowser();
    const { data } = await supabase.from("hero_slides").select("*").order("slide_order");
    if (data && data.length) return data as HeroSlide[];
  } catch {}
  return fallbackHeroSlides;
}

export async function getServices(publishedOnly = true): Promise<Service[]> {
  const local = getLocalOverride<Service[]>("services");
  if (local) return local.filter(s=> !publishedOnly || s.is_published).sort((a,b)=>a.display_order-b.display_order);
  try {
    const supabase = createBrowser();
    let q = supabase.from("services").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data, error } = await q;
    if (!error && data && data.length) return data as Service[];
  } catch {}
  return fallbackServices.filter(s=> !publishedOnly || s.is_published);
}

export async function getIndustries(publishedOnly = true) {
  const local = getLocalOverride<Industry[]>("industries");
  if (local) return local.filter(s=> !publishedOnly || s.is_published).sort((a,b)=>a.display_order-b.display_order);
  try {
    const supabase = createBrowser();
    let q = supabase.from("industries").select("*").order("display_order");
    if (publishedOnly) q = q.eq("is_published", true);
    const { data, error } = await q;
    if (!error && data && data.length) return data as Industry[];
  } catch {}
  return fallbackIndustries as unknown as Industry[];
}

export async function getNavigation(): Promise<NavigationItem[]> {
  const local = getLocalOverride<NavigationItem[]>("navigation");
  if (local) return local.filter(n=>n.is_visible).sort((a,b)=>a.display_order-b.display_order);
  try {
    const supabase = createBrowser();
    const { data } = await supabase.from("navigation_items").select("*").eq("is_visible", true).order("display_order");
    if (data && data.length) return data as NavigationItem[];
  } catch {}
  return fallbackNavigation;
}

// Server-side versions (use import from @supabase/ssr via createServerClient)
// For simplicity, public pages will use browser client even on server? Provide server helpers separately.
