/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/mudre-misli' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mudre-misli' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig