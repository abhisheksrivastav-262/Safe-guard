const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Curated high quality high-resolution imagery tailored to Indian context & business verticals
const imageMap = {
  // Hero & Slideshow
  'hero-corporate-bldg.jpg': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85', // Modern high-rise tower
  'hero-cctv-room.jpg': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1920&q=85', // CCTV control room
  'hero-facility-mgmt.jpg': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=85', // Facility management team
  'hero-housekeeping.jpg': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=85', // Housekeeping team
  'city-skyline-night.jpg': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1920&q=85', // Mumbai cityscape night

  // About Page
  'about-hero.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85',
  'about-team.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  'about-facility.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',

  // 12 Core Services
  'service-security.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  'service-facility.jpg': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  'service-housekeeping.jpg': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  'service-gardening.jpg': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  'service-fire-safety.jpg': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  'service-dog-squad.jpg': 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=600&q=80',
  'service-event-security.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
  'service-technical.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  'service-pest-control.jpg': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
  'service-reception.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'service-detective.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
  'service-stp.jpg': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',

  // 12 Industries
  'ind-residential.jpg': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  'ind-corporate.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  'ind-commercial.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'ind-malls.jpg': 'https://images.unsplash.com/photo-1519566335946-e6f65f0f84ad?w=600&q=80',
  'ind-hospitals.jpg': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  'ind-hotels.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  'ind-schools.jpg': 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
  'ind-factories.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  'ind-warehouses.jpg': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
  'ind-construction.jpg': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'ind-events.jpg': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
  'ind-institutions.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',

  // Technical & Maintenance Subpage
  'tech-electrical.jpg': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
  'tech-plumbing.jpg': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  'tech-hvac.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  'tech-civil.jpg': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'tech-preventive.jpg': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80',
  'tech-infrastructure.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'tech-stp-main.jpg': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
  'tech-control-panel.jpg': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&q=80',
  'tech-pumps.jpg': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',

  // Fire & Safety Subpage
  'fire-safety-main.jpg': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  'dog-squad-main.jpg': 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=80',
  'bouncer-main.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  'event-crowd-1.jpg': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80',
  'event-crowd-2.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
  'event-crowd-3.jpg': 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&q=80',

  // Detective Subpage
  'detective-main.jpg': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',

  // Contact Page Map
  'contact-map.jpg': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Downloading ${Object.keys(imageMap).length} images to ${IMAGES_DIR}...`);
  for (const [filename, url] of Object.entries(imageMap)) {
    const dest = path.join(IMAGES_DIR, filename);
    try {
      await download(url, dest);
      const stat = fs.statSync(dest);
      console.log(`✓ ${filename} (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${filename}:`, err.message);
    }
  }
  console.log('All image downloads completed!');
}

run();
