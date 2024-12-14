/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_WS_URL: 'wss://demos.yjs.dev',
  },
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable compression
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // Enable CSS optimization
    scrollRestoration: true, // Improve scroll restoration
  },
  images: {
    domains: ['cdn.jsdelivr.net'], // Add trusted image domains
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
};

module.exports = nextConfig;