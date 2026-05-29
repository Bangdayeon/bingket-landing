import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/lounge', '/lounge/'],
        disallow: ['/lounge/search'],
      },
    ],
    sitemap: 'https://bingket-landing.vercel.app/sitemap.xml',
  };
}
