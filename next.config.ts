import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [375, 768, 1280, 1920],
  },
};

export default nextConfig;
