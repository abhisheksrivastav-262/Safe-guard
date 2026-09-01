export interface SiteSettings {
  id: string;
  site_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  primary_phone: string;
  secondary_phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  google_maps_url: string;
  support_hours: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  website_status: string;
  maintenance_mode: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  parent_id: string | null;
  display_order: number;
  is_visible: boolean;
  open_new_tab: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  highlighted_title: string | null;
  subtitle: string | null;
  eyebrow: string | null;
  image_url: string;
  image_alt: string | null;
  primary_cta_text: string | null;
  primary_cta_url: string | null;
  secondary_cta_text: string | null;
  secondary_cta_url: string | null;
  slide_order: number;
  duration_ms: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  card_image_url: string | null;
  icon: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  meta_title: string | null;
  meta_description: string | null;
}

export interface ServiceItem {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_visible: boolean;
}

export interface ServiceEnvironment {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  display_order: number;
  is_visible: boolean;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  icon: string;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  meta_title: string | null;
  meta_description: string | null;
}

export interface IndustryPoint {
  id: string;
  industry_id: string;
  title: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string | null;
  company: string | null;
  content: string;
  image_url: string | null;
  rating: number;
  display_order: number;
  is_published: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string;
  alt_text: string | null;
  display_order: number;
  is_published: boolean;
}

export interface ContactEnquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  company_name: string | null;
  location: string | null;
  property_type: string | null;
  service_required: string | null;
  message: string | null;
  status: "New" | "Contacted" | "In Progress" | "Converted" | "Closed";
  notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageSEO {
  id: string;
  page_key: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  noindex: boolean;
  nofollow: boolean;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  section_type: string;
  title: string | null;
  subtitle: string | null;
  eyebrow: string | null;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  display_order: number;
  is_visible: boolean;
  background_variant: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  description: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: "super_admin" | "admin" | "editor";
  is_active: boolean;
}

export interface AboutContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  secondary_description: string | null;
  image_url: string | null;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  display_order: number;
  is_visible: boolean;
}
