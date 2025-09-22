# Now let's create ALL the frontend files
frontend_files = {}

# Frontend package.json
frontend_files["frontend/package.json"] = """{
  "name": "university-scheduling-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest --watch",
    "test:ci": "jest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.4.0",
    "tailwindcss": "^3.3.0",
    "tailwindcss-rtl": "^0.9.0",
    "@tailwindcss/forms": "^0.5.0",
    "react-hook-form": "^7.45.0",
    "@hookform/resolvers": "^3.1.0",
    "yup": "^1.2.0",
    "react-beautiful-dnd": "^13.1.1",
    "@hello-pangea/dnd": "^16.3.0",
    "react-query": "^3.39.0",
    "@tanstack/react-query": "^4.29.0",
    "axios": "^1.4.0",
    "moment-jalaali": "^0.9.6",
    "react-hot-toast": "^2.4.1",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.1",
    "react-icons": "^4.10.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "exceljs": "^4.3.0",
    "file-saver": "^2.0.5",
    "qrcode": "^1.5.3",
    "recharts": "^2.7.0",
    "react-color": "^2.19.3",
    "react-select": "^5.7.0",
    "react-datepicker": "^4.11.0",
    "react-helmet-async": "^1.3.0",
    "js-cookie": "^3.0.5",
    "zustand": "^4.3.0",
    "immer": "^10.0.0",
    "lodash": "^4.17.21",
    "classnames": "^2.3.2",
    "react-dropzone": "^14.2.0"
  },
  "devDependencies": {
    "@next/eslint-config-next": "^14.0.0",
    "eslint": "^8.45.0",
    "eslint-config-next": "^14.0.0",
    "jest": "^29.6.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.0",
    "jest-environment-jsdom": "^29.6.0",
    "cypress": "^12.17.0",
    "@types/js-cookie": "^3.0.3",
    "@types/lodash": "^4.14.0",
    "@types/react-color": "^3.0.6",
    "@types/file-saver": "^2.0.5",
    "@types/qrcode": "^1.5.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}"""

# Next.js config
frontend_files["frontend/next.config.js"] = """/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['fa', 'en'],
    defaultLocale: 'fa',
    localeDetection: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'سیستم برنامه‌ریزی دروس',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  experimental: {
    appDir: false
  }
}

module.exports = nextConfig"""

# Tailwind config
frontend_files["frontend/tailwind.config.js"] = """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'iran-sans': ['IRANSans', 'Tahoma', 'Arial', 'sans-serif'],
        'vazir': ['Vazir', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a'
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706'
        },
        danger: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626'
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    function({ addUtilities }) {
      addUtilities({
        '.dir-rtl': {
          direction: 'rtl',
        },
        '.dir-ltr': {
          direction: 'ltr',
        },
        '.text-start-rtl': {
          'text-align': 'right',
        },
        '.text-end-rtl': {
          'text-align': 'left',
        },
        '.float-start-rtl': {
          'float': 'right',
        },
        '.float-end-rtl': {
          'float': 'left',
        },
        '.border-start-rtl': {
          'border-right-width': '1px',
        },
        '.border-end-rtl': {
          'border-left-width': '1px',
        },
        '.rounded-start-rtl': {
          'border-top-right-radius': '0.375rem',
          'border-bottom-right-radius': '0.375rem',
        },
        '.rounded-end-rtl': {
          'border-top-left-radius': '0.375rem',
          'border-bottom-left-radius': '0.375rem',
        }
      })
    }
  ],
}"""

# TypeScript config
frontend_files["frontend/tsconfig.json"] = """{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/contexts/*": ["./src/contexts/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}"""

# Main Pages
frontend_files["frontend/pages/_app.tsx"] = """import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ScheduleProvider } from '@/contexts/ScheduleContext'
import Layout from '@/components/common/Layout'
import '@/styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ScheduleProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f2937',
                  color: '#fff',
                  fontFamily: 'IRANSans, Tahoma, Arial, sans-serif',
                  direction: 'rtl',
                },
              }}
            />
          </ScheduleProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}"""

frontend_files["frontend/pages/_document.tsx"] = """import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="سیستم جامع برنامه‌ریزی دروس دانشگاهی" />
        <meta name="keywords" content="برنامه‌ریزی, دروس, دانشگاه, تقویم شمسی" />
        <meta name="author" content="University Scheduling Team" />
        
        {/* Persian Fonts */}
        <link rel="preload" href="/fonts/IRANSans.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Vazir.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* SEO */}
        <meta property="og:title" content="سیستم برنامه‌ریزی دروس دانشگاهی" />
        <meta property="og:description" content="سیستم جامع برنامه‌ریزی دروس دانشگاهی با پشتیبانی کامل فارسی" />
        <meta property="og:type" content="website" />
        
        <style jsx>{`
          @font-face {
            font-family: 'IRANSans';
            src: url('/fonts/IRANSans.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Vazir';
            src: url('/fonts/Vazir.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </Head>
      <body className="font-iran-sans bg-gray-50 dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}"""

frontend_files["frontend/pages/index.tsx"] = """import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Loading from '@/components/common/Loading'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard')
      } else {
        router.replace('/login')
      }
    }
  }, [user, loading, router])

  return <Loading />
}"""

frontend_files["frontend/pages/login.tsx"] = """import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const schema = yup.object({
  email: yup.string().email('ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
  password: yup.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
})

type LoginForm = yup.InferType<typeof schema>

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      toast.success('خوش آمدید!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'خطا در ورود')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>ورود - سیستم برنامه‌ریزی دروس</title>
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
              ورود به سیستم
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              یا{' '}
              <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                label="ایمیل"
                type="email"
                placeholder="example@domain.com"
                error={errors.email?.message}
                {...register('email')}
              />
              
              <div className="relative">
                <Input
                  label="رمز عبور"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="رمز عبور خود را وارد کنید"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute left-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-900 dark:text-gray-300">
                  مرا به خاطر بسپار
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
            >
              ورود
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}"""

# Save the frontend files content
import json
with open('frontend_files_complete.json', 'w', encoding='utf-8') as f:
    json.dump(frontend_files, f, ensure_ascii=False, indent=2)

print("✅ فایل‌های Frontend کامل شد!")
print("=" * 60)
print("📁 Frontend Files Created:")
print("   ✓ package.json - وابستگی‌های کامل")
print("   ✓ next.config.js - تنظیمات Next.js")
print("   ✓ tailwind.config.js - Tailwind RTL")
print("   ✓ tsconfig.json - TypeScript")
print("   ✓ _app.tsx - Provider setup")
print("   ✓ _document.tsx - RTL Document")
print("   ✓ index.tsx - Home redirect")
print("   ✓ login.tsx - صفحه ورود کامل")