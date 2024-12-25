/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oddbyte.dev',
      },
      {
        protocol: 'https',
        hostname: 'httpfox.gay',
      },
      {
        protocol: 'https',
        hostname: 'api.nasa.gov',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://oddbyte-api.deeka.me/:path*'
      }
    ];
  },
};

export default nextConfig;