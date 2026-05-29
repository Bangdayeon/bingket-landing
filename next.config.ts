import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ce1a524f861f4062a6ec96dd100c4aec.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7일
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
