-- SAFE Guard FORCE CMS - Initial Migration
-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  full_name text,
  email text,
  avatar_url text,
  role text check (role in ('super_admin','admin','editor')) default 'admin',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- site_settings (single row)
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text default 'SAFE Guard FORCE',
  tagline text default 'Nationwide Security Group',
  logo_url text default '/images/safelogo.jpeg',
  favicon_url text default '/images/safelogo.jpeg',
  primary_phone text default '9323581437',
  secondary_phone text default '9136645289',
  whatsapp_number text default '919323581437',
  email text default 'info@safeguardforce.in',
  address text default 'C 517, Kailash Esplanade, Opp. Shreyash Cinema, LBS Marg',
  city text default 'Mumbai',
  state text default 'Maharashtra',
  postal_code text default '400086',
  country text default 'India',
  google_maps_url text default 'https://maps.google.com/?q=C+517+Kailash+Esplanade+Ghatkopar+West+Mumbai',
  support_hours text default '24/7 Professional Assistance',
  facebook_url text default '',
  instagram_url text default '',
  linkedin_url text default '',
  youtube_url text default '',
  website_status text default 'active',
  maintenance_mode boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- navigation_items
create table if not exists navigation_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  parent_id uuid references navigation_items(id) on delete cascade,
  display_order int default 0,
  is_visible boolean default true,
  open_new_tab boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- homepage_sections
create table if not exists homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  section_type text not null,
  title text,
  subtitle text,
  eyebrow text,
  description text,
  image_url text,
  button_text text,
  button_url text,
  display_order int default 0,
  is_visible boolean default true,
  background_variant text default 'white',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- hero_slides
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  highlighted_title text,
  subtitle text,
  eyebrow text,
  image_url text not null,
  image_alt text,
  primary_cta_text text,
  primary_cta_url text,
  secondary_cta_text text,
  secondary_cta_url text,
  slide_order int default 0,
  duration_ms int default 3000,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- services
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_description text,
  full_description text,
  hero_title text,
  hero_subtitle text,
  hero_image_url text,
  card_image_url text,
  icon text default 'shield',
  is_featured boolean default false,
  is_published boolean default true,
  display_order int default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_services_slug on services(slug);
create index if not exists idx_services_published on services(is_published);

-- service_items
create table if not exists service_items (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  display_order int default 0,
  is_visible boolean default true,
  created_at timestamptz default now()
);

-- service_environments
create table if not exists service_environments (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  title text not null,
  description text,
  display_order int default 0,
  is_visible boolean default true,
  created_at timestamptz default now()
);

-- industries
create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  image_url text,
  icon text default 'building',
  is_featured boolean default false,
  is_published boolean default true,
  display_order int default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_industries_slug on industries(slug);

-- industry_points
create table if not exists industry_points (
  id uuid primary key default gen_random_uuid(),
  industry_id uuid references industries(id) on delete cascade,
  title text not null,
  display_order int default 0,
  created_at timestamptz default now()
);

-- testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  designation text,
  company text,
  content text not null,
  image_url text,
  rating int default 5 check (rating >=1 and rating <=5),
  display_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- faqs
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'general',
  display_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- gallery_items
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text not null,
  category text default 'general',
  alt_text text,
  display_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- contact_enquiries
create table if not exists contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  company_name text,
  location text,
  property_type text,
  service_required text,
  message text,
  status text default 'New' check (status in ('New','Contacted','In Progress','Converted','Closed')),
  notes text,
  assigned_to uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_enquiries_status on contact_enquiries(status);
create index if not exists idx_enquiries_created on contact_enquiries(created_at desc);

-- page_seo
create table if not exists page_seo (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null,
  meta_title text,
  meta_description text,
  canonical_url text,
  og_title text,
  og_description text,
  og_image_url text,
  noindex boolean default false,
  nofollow boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- activity_logs
create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id text,
  description text,
  created_at timestamptz default now()
);
create index if not exists idx_activity_created on activity_logs(created_at desc);

-- about_content
create table if not exists about_content (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  title text,
  subtitle text,
  description text,
  secondary_description text,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- core_values
create table if not exists core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text default 'shield',
  display_order int default 0,
  is_visible boolean default true,
  created_at timestamptz default now()
);

-- media_library (metadata for storage)
create table if not exists media_library (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_url text not null,
  file_size int,
  mime_type text,
  alt_text text,
  caption text,
  folder text default 'general',
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- RLS enable
alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table navigation_items enable row level security;
alter table homepage_sections enable row level security;
alter table hero_slides enable row level security;
alter table services enable row level security;
alter table service_items enable row level security;
alter table service_environments enable row level security;
alter table industries enable row level security;
alter table industry_points enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table gallery_items enable row level security;
alter table contact_enquiries enable row level security;
alter table page_seo enable row level security;
alter table activity_logs enable row level security;
alter table about_content enable row level security;
alter table core_values enable row level security;
alter table media_library enable row level security;

-- Public read policies for published content
create policy "Public can read site_settings" on site_settings for select using (true);
create policy "Public can read navigation_items visible" on navigation_items for select using (is_visible = true);
create policy "Public can read navigation admin" on navigation_items for all using (auth.role() = 'authenticated');
create policy "Public can read homepage_sections visible" on homepage_sections for select using (is_visible = true);
create policy "Auth can manage homepage_sections" on homepage_sections for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read hero_slides active" on hero_slides for select using (is_active = true);
create policy "Auth can manage hero_slides" on hero_slides for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read published services" on services for select using (is_published = true);
create policy "Auth can manage services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read service_items visible" on service_items for select using (is_visible = true);
create policy "Auth can manage service_items" on service_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read service_environments visible" on service_environments for select using (is_visible = true);
create policy "Auth can manage service_environments" on service_environments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read published industries" on industries for select using (is_published = true);
create policy "Auth can manage industries" on industries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read industry_points" on industry_points for select using (true);
create policy "Auth can manage industry_points" on industry_points for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read published testimonials" on testimonials for select using (is_published = true);
create policy "Auth can manage testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read published faqs" on faqs for select using (is_published = true);
create policy "Auth can manage faqs" on faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read published gallery" on gallery_items for select using (is_published = true);
create policy "Auth can manage gallery" on gallery_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can insert enquiries" on contact_enquiries for insert with check (true);
create policy "Auth can manage enquiries" on contact_enquiries for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read page_seo" on page_seo for select using (true);
create policy "Auth can manage page_seo" on page_seo for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Auth can read activity_logs" on activity_logs for select using (auth.role() = 'authenticated');
create policy "Auth can insert activity_logs" on activity_logs for insert with check (auth.role() = 'authenticated');
create policy "Public can read about_content" on about_content for select using (true);
create policy "Auth can manage about_content" on about_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Public can read core_values visible" on core_values for select using (is_visible = true);
create policy "Auth can manage core_values" on core_values for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
-- newsletter_subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- appointments (consultation / service requests)
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  service_type text,
  preferred_date text,
  preferred_time text,
  property_type text,
  location text,
  notes text,
  status text default 'Pending' check (status in ('Pending', 'Approved', 'Completed', 'Cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;
alter table appointments enable row level security;

create policy "Public insert newsletter" on newsletter_subscribers for insert with check (true);
create policy "Auth manage newsletter" on newsletter_subscribers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Public insert appointments" on appointments for insert with check (true);
create policy "Auth manage appointments" on appointments for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage bucket
insert into storage.buckets (id, name, public) values ('safe_guard_media','safe_guard_media', true) on conflict (id) do nothing;
-- storage policies
create policy "Public read media" on storage.objects for select using (bucket_id = 'safe_guard_media');
create policy "Auth upload media" on storage.objects for insert with check (bucket_id = 'safe_guard_media' and auth.role() = 'authenticated');
create policy "Auth update media" on storage.objects for update using (bucket_id = 'safe_guard_media' and auth.role() = 'authenticated');
create policy "Auth delete media" on storage.objects for delete using (bucket_id = 'safe_guard_media' and auth.role() = 'authenticated');

-- Updated_at trigger
create or replace function update_updated_at() returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;
create trigger trg_site_settings_updated before update on site_settings for each row execute function update_updated_at();
create trigger trg_services_updated before update on services for each row execute function update_updated_at();
create trigger trg_hero_updated before update on hero_slides for each row execute function update_updated_at();
create trigger trg_profiles_updated before update on profiles for each row execute function update_updated_at();

