// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({ extension: 'mdx' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'kysely', 'postcss', 'shiki'],
  },
}

module.exports = withMDX(nextConfig)
