/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['images.unsplash.com', 'localhost', 'yuezers.ga'],
    }
}

module.exports = nextConfig
