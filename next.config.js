/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.VERCEL_URL
  },
};

module.exports = nextConfig;
