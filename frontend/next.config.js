/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // Persian/RTL Configuration
    i18n: {
        locales: ['fa', 'en'],
        defaultLocale: 'fa',
        localeDetection: false,
    },

    // Performance optimizations
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },

    // Image optimization
    images: {
        domains: ['cdn.jsdelivr.net'],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 86400,
    },

    // Font optimization
    optimizeFonts: true,

    // Compression
    compress: true,

    // Headers for security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            {
                source: '/fonts/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Redirects
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
        ];
    },

    // Environment variables
    env: {
        CUSTOM_KEY: 'persian-website',
        APP_VERSION: '1.0.0',
    },

    // Webpack configuration
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // Font optimization
        config.module.rules.push({
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    publicPath: './',
                    outputPath: 'static/fonts/',
                },
            },
        });

        // Alias configuration
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': require('path').resolve(__dirname, 'src'),
        };

        return config;
    },

    // Output configuration
    output: 'standalone',

    // Trailing slash
    trailingSlash: false,

    // Power by header
    poweredByHeader: false,

    // Analytics
    analyticsId: process.env.ANALYTICS_ID || '',
};

module.exports = nextConfig;