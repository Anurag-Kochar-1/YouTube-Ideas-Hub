/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/auth/:path',
            destination: '/api/auth/:path*',
          },
          {
            source: '/api/:path*',
            destination: 'http://localhost:8000/api/v1/:path*',
          },
        ];
      },
      images: {
        domains: ['yt3.ggpht.com']
      }
  };
  
  module.exports = nextConfig;
  