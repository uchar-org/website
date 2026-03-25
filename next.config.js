const createMDX = require('@next/mdx')

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

module.exports = withMDX(nextConfig)
