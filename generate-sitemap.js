const fs = require('fs');
const axios = require('axios');

const BASE_URL = 'https://stayspot.vercel.app';
const SITEMAP_PATH = './sitemap.xml';

// Static routes
const staticRoutes = [
  '/',
  '/login',
  '/browse-rentals',
  '/post-rental',
  '/about-us',
  '/contact',
  '/profile',
  '/your-listings',
  '/favorites',
  '/messages',
];

async function fetchRentalIds() {
  try {
    // This endpoint should return all rental IDs. Adjust if your API is different.
    const res = await axios.get('https://stayspot.onrender.com/api/rentals');
    if (Array.isArray(res.data)) {
      return res.data.map(r => r._id || r.id);
    }
    if (Array.isArray(res.data.rentals)) {
      return res.data.rentals.map(r => r._id || r.id);
    }
    return [];
  } catch (e) {
    console.error('Could not fetch rental IDs:', e.message);
    return [];
  }
}

async function generateSitemap() {
  let urls = staticRoutes.map(route => `  <url>\n    <loc>${BASE_URL}${route}</loc>\n  </url>`);

  // Add dynamic rental detail pages
  const rentalIds = await fetchRentalIds();
  rentalIds.forEach(id => {
    urls.push(`  <url>\n    <loc>${BASE_URL}/rental/details/${id}</loc>\n  </url>`);
  });

  const sitemap = `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log('Sitemap generated with', urls.length, 'URLs.');
}

generateSitemap();
