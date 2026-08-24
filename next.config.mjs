/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  basePath: process.env.STATIC_EXPORT === 'true' ? '/mudre-misli' : '',
  assetPrefix: process.env.STATIC_EXPORT === 'true' ? '/mudre-misli' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
