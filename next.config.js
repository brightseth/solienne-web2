/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
}