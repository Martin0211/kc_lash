/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;

