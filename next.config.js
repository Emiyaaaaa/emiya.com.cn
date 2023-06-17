/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mysql2', 'kysely', 'postcss', 'shiki'],
  },
}

module.exports = nextConfig
