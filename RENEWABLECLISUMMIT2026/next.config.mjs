/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack fallback (used in non-Turbopack builds)
  webpack: (config) => {
    if (!config.resolve.extensions.includes('.jsx')) {
      config.resolve.extensions.push('.jsx');
    }
    return config;
  },
  // Turbopack config (used by Next.js 16+ production builds)
  experimental: {
    turbo: {
      resolveExtensions: ['.jsx', '.tsx', '.ts', '.js', '.mjs', '.json'],
      rules: {
        '*.jsx': ['@vercel/webpack-loader'],
      }
    },
  },
};

export default nextConfig;
