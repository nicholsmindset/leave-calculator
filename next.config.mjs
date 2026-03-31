/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image domains for external sources (OG images, etc.)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Experimental: enable server actions (needed for share API)
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'parentalleavecalculator.com'],
    },
  },
}

export default nextConfig
