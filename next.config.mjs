/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Three root layouts ((legacy), (site), (ar)) need one 404 for unmatched URLs.
    globalNotFound: true,
  },
  async redirects() {
    return [{ source: '/partner', destination: '/#partner', permanent: true }]
  },
}

export default nextConfig
