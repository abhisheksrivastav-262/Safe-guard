-- Seed data for SAFE Guard FORCE
-- Run after 001_initial_cms.sql

-- site_settings
insert into site_settings (site_name, tagline, logo_url, primary_phone, secondary_phone, whatsapp_number, email, address, city, state, postal_code, google_maps_url, support_hours)
values ('SAFE Guard FORCE','Nationwide Security Group','/images/safelogo.jpeg','9323581437','9136645289','919323581437','info@safeguardforce.in','C 517, Kailash Esplanade, Opp. Shreyash Cinema, LBS Marg','Mumbai','Maharashtra','400086','https://maps.google.com/?q=C+517+Kailash+Esplanade+Ghatkopar+West+Mumbai','24/7 Professional Assistance')
on conflict do nothing;

-- navigation_items
insert into navigation_items (label, href, parent_id, display_order, is_visible) values
('Home','/',null,1,true),
('About','/about',null,2,true),
('Industries','/industries',null,4,true),
('Investigations','/detective-services',null,5,true),
('Contact','/contact',null,6,true)
on conflict do nothing;
-- services dropdown parent
insert into navigation_items (label, href, display_order, is_visible) values ('Services','#',3,true) on conflict do nothing;

-- hero_slides
insert into hero_slides (title, highlighted_title, subtitle, eyebrow, image_url, image_alt, primary_cta_text, primary_cta_url, secondary_cta_text, secondary_cta_url, slide_order, is_active) values
('SECURITY','THAT PROTECTS. SERVICES THAT PERFORM.','Professional security, facility management, technical maintenance, STP operations and confidential investigation solutions.','Integrated Security & Facility Solutions','/images/safeforce.jpeg','SAFE Guard FORCE personnel','Get a Free Consultation','/contact','Call 9323581437','tel:9323581437',1,true),
('FACILITY MANAGEMENT','ONE RESPONSIBLE PARTNER','End-to-end operations for societies, corporate offices and institutions.','Complete Facility Management','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80','Corporate building','Explore Services','/facility-management','Call Now','tel:9323581437',2,true),
('YOUR TRUST.','OUR COMMITMENT','Disciplined personnel, structured supervision and reporting.','Trusted Across Mumbai','https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80','Monitoring','View Industries','/industries','Contact Us','/contact',3,true)
on conflict do nothing;

-- services
insert into services (name, slug, short_description, hero_title, hero_subtitle, hero_image_url, card_image_url, icon, display_order, is_featured, is_published, meta_title) values
('Security Services','security-services','Trained & verified guards, supervisors, officers, bouncers, access control and patrolling.','Professional Security. Proactive Protection.','Comprehensive manned guarding.','/images/safeforce.jpeg','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80','shield',1,true,true,'Security Services — SAFE Guard FORCE'),
('Facility Management','facility-management','Society & facility managers, supervisors, inspections and vendor coordination.','Complete Facility Management. One Responsible Partner.','End-to-end operations.','https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80','building',2,true,true,'Facility Management — SAFE Guard FORCE'),
('Housekeeping','housekeeping','Cleaning, sanitization, waste management and hygiene maintenance.','Cleaner Spaces. Healthier Environments.','Professional cleaning.','https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80','https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80','sparkles',3,true,true,'Housekeeping — SAFE Guard FORCE'),
('Gardening & Landscaping','gardening-landscaping','Lawn, garden, irrigation, pruning and landscape maintenance.','Green Spaces, Beautifully Maintained','Gardening services.','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80','https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80','leaf',4,true,true,'Gardening — SAFE Guard FORCE'),
('Fire & Safety','fire-safety','Fire marshals, inspections, evacuation planning and safety training.','Prepared for Every Situation.','Fire safety.','https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80','https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80','flame',5,true,true,'Fire & Safety — SAFE Guard FORCE'),
('Dog Squad','dog-squad','Trained sniffer dogs & handlers for patrol and detection.','Trained Canine Security','Dog squad.','https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1920&q=80','https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=600&q=80','paw',6,false,true,'Dog Squad — SAFE Guard FORCE'),
('Event Security','event-security','Crowd control, VIP protection and venue entry management.','Secure, Seamless Events','Event security.','https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1920&q=80','https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80','users',7,false,true,'Event Security — SAFE Guard FORCE'),
('Technical Maintenance','technical-maintenance','Electrical, plumbing, HVAC, civil and infrastructure support.','Technical Expertise Behind Efficient Operations.','Technical maintenance and STP.','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80','wrench',8,true,true,'Technical Maintenance — SAFE Guard FORCE'),
('Pest Control','pest-control','Mosquito, termite, cockroach and rodent management.','Preventive Hygiene & Pest Management','Pest control.','https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80','https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80','bug',9,false,true,'Pest Control — SAFE Guard FORCE'),
('Reception & Helpdesk','reception-helpdesk','Receptionists, helpdesk, pantry and office support staff.','Front-Office Excellence','Reception services.','https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80','https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80','headset',10,false,true,'Reception — SAFE Guard FORCE'),
('Detective Services','detective-services','Confidential investigations, verification and surveillance.','Confidential Information. Professional Investigation.','Detective services.','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80','https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80','search',11,true,true,'Detective Services — SAFE Guard FORCE'),
('STP Operations','stp-operations','Sewage treatment plant operation, maintenance & compliance.','Professional Sewage Treatment Operations','STP ops.','https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80','https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80','droplet',12,true,true,'STP Operations — SAFE Guard FORCE')
on conflict (slug) do nothing;

-- industries
insert into industries (name, slug, short_description, image_url, display_order, is_featured, is_published) values
('Residential Societies','residential-societies','Security, housekeeping, facility management, gardening, STP and support staff for harmonious living.','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',1,true,true),
('Corporate Offices','corporate-offices','Reception, security, housekeeping and technical support for productive workplaces.','https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',2,true,true),
('Commercial Complexes','commercial-complexes','High-footfall protocols for lobbies, parking and common areas.','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',3,true,true),
('Malls','malls','Crowd management, asset protection and hygiene at scale.','https://images.unsplash.com/photo-1519566335946-e6f65f0f84ad?w=600&q=80',4,true,true),
('Hospitals','hospitals','Sensitive, hygienic and disciplined operations for healthcare.','https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',5,true,true),
('Hotels','hotels','Guest-facing excellence in security, housekeeping and maintenance.','https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',6,true,true),
('Schools & Institutions','schools-institutions','Child-safe, vigilant and clean campuses.','https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',7,true,true),
('Factories','factories','Perimeter, material and workforce security with technical support.','https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',8,true,true),
('Warehouses','warehouses','Inventory protection and dock discipline.','https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',9,true,true),
('Construction Sites','construction-sites','Overnight material, equipment and labour management.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',10,true,true),
('Events','events','Bouncers, crowd control and discreet VIP protection.','https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',11,true,true),
('Other Institutions','other-institutions','Customized integrated solutions for any premises type.','https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',12,false,true)
on conflict (slug) do nothing;

-- homepage_sections
insert into homepage_sections (section_key, section_type, title, subtitle, eyebrow, description, display_order, is_visible) values
('trust_intro','trust','A Safer, Smarter & Better Managed Tomorrow.','Trusted Integrated Partner','Trusted Integrated Partner','SAFE Guard FORCE combines security, facility management, housekeeping, technical services, STP operations and investigation capabilities.',1,true),
('why_choose','features','Why Organizations Trust SAFE Guard FORCE','Why Organizations Trust Us','Why Organizations Trust Us','Disciplined execution.',2,true),
('cta_final','cta','Your Property Deserves More Than Basic Security.','Partner with SAFE Guard FORCE','Ready to Secure?','Professional security, facility management, technical maintenance, STP operations and investigation solutions.',3,true)
on conflict (section_key) do nothing;

-- about_content
insert into about_content (section_key, title, description, secondary_description, image_url) values
('who_we_are','Integrated Services. One Accountable Partner.','SAFE Guard FORCE / Nationwide Security Group provides integrated security, facility management, housekeeping, gardening, technical maintenance, STP operations, fire & safety and confidential investigation services.','Headquartered at C 517, Kailash Esplanade, Ghatkopar West, Mumbai.', '/images/safeforce.jpeg'),
('mission','Our Mission','To provide reliable, disciplined and professional services that help organizations maintain safer, cleaner and efficiently managed premises.', null, null),
('vision','Our Vision','To become a trusted integrated security and facility-management partner for organizations across India.', null, null),
('commitment','Our Commitment','Professional conduct, verified personnel, regular supervision and customized solutions — every site, every day.', null, null)
on conflict (section_key) do nothing;

-- core_values
insert into core_values (title, description, display_order, is_visible) values
('Integrity','Honest, ethical and transparent operations.',1,true),
('Discipline','Uniformed, punctual and procedure-driven teams.',2,true),
('Professionalism','Trained manpower with clear SOPs.',3,true),
('Accountability','Supervised execution with reporting.',4,true),
('Confidentiality','Discreet handling of sensitive matters.',5,true),
('Customer Satisfaction','Responsive support and resolution.',6,true),
('Safety','Proactive risk identification & prevention.',7,true),
('Environmental Responsibility','Hygiene, STP and sustainable ops.',8,true)
on conflict do nothing;

-- page_seo
insert into page_seo (page_key, meta_title, meta_description, og_title) values
('home','SAFE Guard FORCE | Integrated Security & Facility Management Mumbai','Integrated security, facility management, housekeeping, technical maintenance, STP operations & investigation solutions.','SAFE Guard FORCE'),
('about','About Us — SAFE Guard FORCE','An integrated security organization delivering safer premises across Mumbai.','About SAFE Guard FORCE'),
('contact','Contact Us — SAFE Guard FORCE','Reach our team for a free consultation.','Contact SAFE Guard FORCE'),
('industries','Industries We Serve — SAFE Guard FORCE','Solutions designed around your environment.','Industries')
on conflict (page_key) do nothing;

-- testimonials sample
insert into testimonials (name, designation, company, content, rating, is_published, display_order) values
('Rajesh Sharma','Secretary','Green Valley CHS, Ghatkopar','Professional guards and excellent facility management. Very disciplined team.',5,true,1),
('Priya Mehta','Admin Manager','Acme Corporate, Andheri','Housekeeping and technical support is seamless. One point of contact for everything.',5,true,2)
on conflict do nothing;

-- faqs
insert into faqs (question, answer, category, is_published, display_order) values
('What areas do you serve in Mumbai?','We serve all of Mumbai including Ghatkopar, Powai, Andheri, Bandra and beyond, with nationwide capability.','general',true,1),
('How are your personnel verified?','Every guard is antecedent-verified, trained and supervised with regular inspections.','general',true,2),
('Can you handle integrated services?','Yes — security, facility, housekeeping, technical, STP and investigation under one partner.','general',true,3)
on conflict do nothing;
