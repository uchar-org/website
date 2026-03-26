const createMDX = require('@next/mdx')
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: false,
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

module.exports = withNextIntl(withMDX(nextConfig))
