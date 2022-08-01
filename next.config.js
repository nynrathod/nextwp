/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com', 'localhost', 'yuezers.com'],
    }
}

module.exports = nextConfig
