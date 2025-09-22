import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="fa" dir="rtl">
            <Head>
                <meta name="format-detection" content="telephone=no" />
                <meta name="format-detection" content="date=no" />
                <meta name="format-detection" content="address=no" />
                <meta name="format-detection" content="email=no" />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />

                {/* Meta Tags */}
                <meta name="description" content="سامانه آموزشی مدرن با بهترین تجربه کاربری" />
                <meta name="keywords" content="آموزش, درس, آنلاین, فارسی, تحصیل" />
                <meta name="author" content="Persian Education System" />

                {/* Open Graph */}
                <meta property="og:title" content="سامانه آموزشی" />
                <meta property="og:description" content="سامانه آموزشی مدرن با بهترین تجربه کاربری" />
                <meta property="og:type" content="website" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            </Head>
            <body className="antialiased">
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}