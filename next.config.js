// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  pageExtensions: ['mdx', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'kysely', 'postcss', 'shiki'],
  },
}

module.exports = withMDX(nextConfig)
