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
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },
};

export default nextConfig;
