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
            destination: `https://youtube-ideas-hub.vercel.app/api/v1/:path*`,
          },
        ];
      },
      images: {
        domains: ['yt3.ggpht.com']
      }
  };
  
  module.exports = nextConfig;
  
