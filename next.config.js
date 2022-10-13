/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.imgur.com',
      'beyond-looks-s3.s3.us-west-1.amazonaws.com'
    ],
  },
}

module.exports = nextConfig
