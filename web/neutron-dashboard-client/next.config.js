/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
  nextRuntime: 'nodejs',
};

module.exports = nextConfig;
