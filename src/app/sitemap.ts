import { MetadataRoute } from 'next';
import { fetchPostsForSitemap } from '@/lib/community';

const BASE_URL = 'https://bingket-landing.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPostsForSitemap();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/lounge`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...posts.map((p) => ({
      url: `${BASE_URL}/lounge/${p.id}`,
      lastModified: new Date(p.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
