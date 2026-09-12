import type { NextConfig } from 'next';

// Pages publishes pre-rendered HTML; the original Sites build remains unchanged.
const nextConfig: NextConfig = process.env.CLOUDFLARE_PAGES === '1'
  ? { output: 'export' }
  : {};

export default nextConfig;
