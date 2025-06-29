/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig; 