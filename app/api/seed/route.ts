import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import {
  fallbackSiteSettings,
  fallbackNavigation,
  fallbackHeroSlides,
  fallbackServices,
  fallbackIndustries,
  fallbackAboutContent,
  fallbackCoreValues,
  fallbackTestimonials,
  fallbackFaqs,
} from "@/lib/data/fallback";

export async function GET() {
  const supabase = await createServiceClient();
  const report: Record<string, any> = {};

  try {
    // 1. Site Settings
    const { data: existingSettings } = await supabase.from("site_settings").select("id").limit(1).single();
    if (!existingSettings) {
      const { error } = await supabase.from("site_settings").insert({
        site_name: fallbackSiteSettings.site_name,
        tagline: fallbackSiteSettings.tagline,
        logo_url: fallbackSiteSettings.logo_url,
        favicon_url: fallbackSiteSettings.favicon_url,
        primary_phone: fallbackSiteSettings.primary_phone,
        secondary_phone: fallbackSiteSettings.secondary_phone,
        whatsapp_number: fallbackSiteSettings.whatsapp_number,
        email: fallbackSiteSettings.email,
        address: fallbackSiteSettings.address,
        city: fallbackSiteSettings.city,
        state: fallbackSiteSettings.state,
        postal_code: fallbackSiteSettings.postal_code,
        country: fallbackSiteSettings.country,
        google_maps_url: fallbackSiteSettings.google_maps_url,
        support_hours: fallbackSiteSettings.support_hours,
        website_status: "active",
        maintenance_mode: false,
      });
      report.site_settings = error ? error.message : "Inserted default settings";
    } else {
      report.site_settings = "Already exists";
    }

    // 2. Navigation Items
    const { count: navCount } = await supabase.from("navigation_items").select("*", { count: "exact", head: true });
    if (!navCount || navCount === 0) {
      const navRows = fallbackNavigation.map((n) => ({
        label: n.label,
        href: n.href,
        display_order: n.display_order,
        is_visible: n.is_visible,
        open_new_tab: n.open_new_tab,
      }));
      const { error } = await supabase.from("navigation_items").insert(navRows);
      report.navigation_items = error ? error.message : `Inserted ${navRows.length} navigation items`;
    } else {
      report.navigation_items = `Already has ${navCount} items`;
    }

    // 3. Hero Slides
    const { count: heroCount } = await supabase.from("hero_slides").select("*", { count: "exact", head: true });
    if (!heroCount || heroCount === 0) {
      const heroRows = fallbackHeroSlides.map((h) => ({
        title: h.title,
        highlighted_title: h.highlighted_title,
        subtitle: h.subtitle,
        eyebrow: h.eyebrow,
        image_url: h.image_url,
        image_alt: h.image_alt,
        primary_cta_text: h.primary_cta_text,
        primary_cta_url: h.primary_cta_url,
        secondary_cta_text: h.secondary_cta_text,
        secondary_cta_url: h.secondary_cta_url,
        slide_order: h.slide_order,
        duration_ms: h.duration_ms,
        is_active: h.is_active,
      }));
      const { error } = await supabase.from("hero_slides").insert(heroRows);
      report.hero_slides = error ? error.message : `Inserted ${heroRows.length} hero slides`;
    } else {
      report.hero_slides = `Already has ${heroCount} slides`;
    }

    // 4. Services
    const { count: srvCount } = await supabase.from("services").select("*", { count: "exact", head: true });
    if (!srvCount || srvCount === 0) {
      const srvRows = fallbackServices.map((s) => ({
        name: s.name,
        slug: s.slug,
        short_description: s.short_description,
        full_description: s.full_description,
        hero_title: s.hero_title,
        hero_subtitle: s.hero_subtitle,
        hero_image_url: s.hero_image_url,
        card_image_url: s.card_image_url,
        icon: s.icon,
        is_featured: s.is_featured,
        is_published: s.is_published,
        display_order: s.display_order,
        meta_title: s.meta_title,
        meta_description: s.meta_description,
      }));
      const { error } = await supabase.from("services").insert(srvRows);
      report.services = error ? error.message : `Inserted ${srvRows.length} services`;
    } else {
      report.services = `Already has ${srvCount} services`;
    }

    // 5. Industries
    const { count: indCount } = await supabase.from("industries").select("*", { count: "exact", head: true });
    if (!indCount || indCount === 0) {
      const indRows = fallbackIndustries.map((ind) => ({
        name: ind.name,
        slug: ind.slug,
        short_description: ind.short_description,
        image_url: ind.image_url,
        icon: ind.icon,
        is_featured: ind.is_featured,
        is_published: ind.is_published,
        display_order: ind.display_order,
      }));
      const { error } = await supabase.from("industries").insert(indRows);
      report.industries = error ? error.message : `Inserted ${indRows.length} industries`;
    } else {
      report.industries = `Already has ${indCount} industries`;
    }

    // 6. About Content
    const { data: existingAbout } = await supabase.from("about_content").select("id").eq("section_key", "about_main").single();
    if (!existingAbout) {
      const { error } = await supabase.from("about_content").insert({
        section_key: "about_main",
        title: fallbackAboutContent.title,
        subtitle: fallbackAboutContent.subtitle,
        description: fallbackAboutContent.description,
        secondary_description: fallbackAboutContent.secondary_description,
        image_url: fallbackAboutContent.image_url,
      });
      report.about_content = error ? error.message : "Inserted default about story";
    } else {
      report.about_content = "Already exists";
    }

    // 7. Core Values
    const { count: valCount } = await supabase.from("core_values").select("*", { count: "exact", head: true });
    if (!valCount || valCount === 0) {
      const valRows = fallbackCoreValues.map((v) => ({
        title: v.title,
        description: v.description,
        icon: v.icon,
        display_order: v.display_order,
        is_visible: v.is_visible,
      }));
      const { error } = await supabase.from("core_values").insert(valRows);
      report.core_values = error ? error.message : `Inserted ${valRows.length} core values`;
    } else {
      report.core_values = `Already has ${valCount} values`;
    }

    // 8. Testimonials
    const { count: testCount } = await supabase.from("testimonials").select("*", { count: "exact", head: true });
    if (!testCount || testCount === 0) {
      const testRows = fallbackTestimonials.map((t) => ({
        name: t.name,
        designation: t.designation,
        company: t.company,
        content: t.content,
        image_url: t.image_url,
        rating: t.rating,
        display_order: t.display_order,
        is_published: t.is_published,
      }));
      const { error } = await supabase.from("testimonials").insert(testRows);
      report.testimonials = error ? error.message : `Inserted ${testRows.length} testimonials`;
    } else {
      report.testimonials = `Already has ${testCount} testimonials`;
    }

    // 9. FAQs
    const { count: faqCount } = await supabase.from("faqs").select("*", { count: "exact", head: true });
    if (!faqCount || faqCount === 0) {
      const faqRows = fallbackFaqs.map((f) => ({
        question: f.question,
        answer: f.answer,
        category: f.category,
        display_order: f.display_order,
        is_published: f.is_published,
      }));
      const { error } = await supabase.from("faqs").insert(faqRows);
      report.faqs = error ? error.message : `Inserted ${faqRows.length} FAQs`;
    } else {
      report.faqs = `Already has ${faqCount} FAQs`;
    }

    // 10. SEO Defaults
    const pages = [
      { page_key: "home", meta_title: "SAFE Guard FORCE | Integrated Security & Facility Management Mumbai", meta_description: "Integrated security, facility management, housekeeping, technical maintenance, STP operations & investigation solutions in Mumbai." },
      { page_key: "about", meta_title: "About Us | SAFE Guard FORCE", meta_description: "Learn about SAFE Guard FORCE - Our mission, disciplined approach, and comprehensive security services." },
      { page_key: "security-services", meta_title: "Security Guard & Manned Protection | SAFE Guard FORCE", meta_description: "Trained, verified, and supervised security personnel for residential societies, commercial complexes, and events." },
      { page_key: "facility-management", meta_title: "Facility Management Services | SAFE Guard FORCE", meta_description: "End-to-end society & commercial facility management solutions." },
      { page_key: "contact", meta_title: "Contact Us | SAFE Guard FORCE", meta_description: "Get in touch with SAFE Guard FORCE for custom security & facility proposals." },
    ];
    for (const p of pages) {
      const { data: existingSeo } = await supabase.from("page_seo").select("id").eq("page_key", p.page_key).single();
      if (!existingSeo) {
        await supabase.from("page_seo").insert(p);
      }
    }
    report.seo = "Initialized SEO defaults";

    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, report });
  }
}
