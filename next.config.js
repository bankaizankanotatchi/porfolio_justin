const withNextIntl = require('next-intl/plugin')();

/** @type {import('import').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Permettre le chargement d'images distantes si besoin (par exemple des démos ou avatars)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
