import type { MetadataRoute } from 'next';

const BASE = 'https://www.glowhousegaming.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/birthday-parties`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/after-school-club`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/book`,                lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/gallery`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/privacy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,               lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];
}
