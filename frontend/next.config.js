/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Domain configuration
  // Set these via environment variables:
  // NEXT_PUBLIC_DOMAIN=appcortex.pro
  // NEXT_PUBLIC_SITE_URL=https://appcortex.pro
  
  images: {
    domains: [
      'play-lh.googleusercontent.com', 
      'is1-ssl.mzstatic.com', 
      'is2-ssl.mzstatic.com', 
      'is3-ssl.mzstatic.com', 
      'is4-ssl.mzstatic.com', 
      'is5-ssl.mzstatic.com',
      // Add your domain for image optimization
      process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    ].filter(Boolean),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  
  // Security headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

