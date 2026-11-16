/** @type {import('next').NextConfig} */
const nextConfig = {
    // /admin opens the content editor (a static page in public/admin)
    async rewrites() {
        return [{ source: '/admin', destination: '/admin/index.html' }];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
