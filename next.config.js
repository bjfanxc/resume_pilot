/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DIFY_API_KEY: process.env.DIFY_API_KEY,
    DIFY_API_BASE_URL: process.env.DIFY_API_BASE_URL,
    DIFY_APP_ID: process.env.DIFY_APP_ID,
  },
}

module.exports = nextConfig