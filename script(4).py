# Create React Components - The most important part!
react_components = {}

# Layout Component
react_components["frontend/src/components/common/Layout.tsx"] = """import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import Header from './Header'
import Sidebar from './Sidebar'
import Loading from './Loading'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { user, loading } = useAuth()
  
  const isAuthPage = ['/login', '/register'].includes(router.pathname)
  
  if (loading) {
    return <Loading />
  }
  
  if (isAuthPage) {
    return <>{children}</>
  }
  
  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dir-rtl">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6 lg:mr-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout"""

# Header Component
react_components["frontend/src/components/common/Header.tsx"] = """import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const Header: React.FC = () => {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('با موفقیت خارج شدید')
      router.push('/login')
    } catch (error) {
      toast.error('خطا در خروج')
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {showMobileMenu ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ب</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                برنامه‌ریزی دروس
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              title={theme === 'dark' ? 'حالت روز' : 'حالت شب'}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 space-x-reverse p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </div>
                </div>
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Cog6ToothIcon className="ml-3 h-4 w-4" />
                      تنظیمات
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      <ArrowRightOnRectangleIcon className="ml-3 h-4 w-4" />
                      خروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {showMobileMenu && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl">
            {/* Mobile menu content would go here */}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header"""

# Sidebar Component
react_components["frontend/src/components/common/Sidebar.tsx"] = """import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { 
  HomeIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import classNames from 'classnames'

const navigation = [
  { name: 'داشبورد', href: '/dashboard', icon: HomeIcon },
  { name: 'برنامه‌ها', href: '/schedules', icon: CalendarDaysIcon },
  { name: 'دروس', href: '/courses', icon: BookOpenIcon },
  { name: 'گزارش‌ها', href: '/reports', icon: ChartBarIcon },
  { name: 'واردات/صادرات', href: '/import-export', icon: DocumentArrowDownIcon },
  { name: 'تنظیمات', href: '/settings', icon: Cog6ToothIcon },
]

const Sidebar: React.FC = () => {
  const router = useRouter()

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href || 
                  (item.href !== '/dashboard' && router.pathname.startsWith(item.href))
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-200'
                        : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                      'group flex items-center px-3 py-2 text-sm font-medium border-r-4 rounded-md transition-colors duration-150'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                        'ml-3 flex-shrink-0 h-5 w-5'
                      )}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          {/* Conflict indicator */}
          <div className="flex-shrink-0 p-4">
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-md p-3">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                <div className="mr-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ۲ تداخل زمانی یافت شد
                  </p>
                  <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-300">
                    <Link href="/conflicts" className="hover:underline">
                      مشاهده جزئیات
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar"""

# Loading Component
react_components["frontend/src/components/common/Loading.tsx"] = """import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md',
  text = 'در حال بارگذاری...',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-iran-sans">
          {text}
        </p>
      )}
    </div>
  )
}

export default Loading"""

# Button Component
react_components["frontend/src/components/common/Button.tsx"] = """import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import Loading from './Loading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-primary-500 dark:text-gray-300 dark:hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loading size="sm" text="" className="ml-2" />
          در حال پردازش...
        </>
      ) : (
        <>
          {icon && <span className="ml-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}

export default Button"""

# Dashboard Component
react_components["frontend/src/components/reports/Dashboard.tsx"] = """import React from 'react'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
import { 
  CalendarDaysIcon,
  BookOpenIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'
import { useSchedule } from '@/hooks/useSchedule'
import Loading from '@/components/common/Loading'
import StatCard from './StatCard'
import Chart from './Chart'

const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { activeSchedule, loading: scheduleLoading } = useSchedule()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch dashboard statistics
      const response = await fetch('/api/reports/dashboard')
      return response.json()
    }
  })

  if (scheduleLoading || statsLoading) {
    return <Loading text="در حال بارگذاری داشبورد..." />
  }

  const quickStats = [
    {
      title: 'برنامه فعال',
      value: activeSchedule?.name || 'انتخاب نشده',
      icon: CalendarDaysIcon,
      color: 'primary'
    },
    {
      title: 'تعداد دروس',
      value: activeSchedule?.courses?.length || 0,
      icon: BookOpenIcon,  
      color: 'success'
    },
    {
      title: 'مجموع واحدها',
      value: activeSchedule?.totalCredits || 0,
      icon: ChartBarIcon,
      color: 'info'
    },
    {
      title: 'ساعات کلاس',
      value: calculateClassHours(activeSchedule?.courses || []),
      icon: ClockIcon,
      color: 'warning'
    },
    {
      title: 'تداخل‌ها',
      value: stats?.conflicts || 0,
      icon: ExclamationTriangleIcon,
      color: 'danger'
    },
    {
      title: 'اساتید',
      value: getUniqueInstructors(activeSchedule?.courses || []).length,
      icon: UserGroupIcon,
      color: 'secondary'
    }
  ]

  return (
    <>
      <Head>
        <title>داشبورد - سیستم برنامه‌ریزی دروس</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            خوش آمدید، {user?.name}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            نمای کلی برنامه درسی شما
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {quickStats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Schedule Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              برنامه هفتگی
            </h3>
            <Chart
              type="bar"
              data={getWeeklyScheduleData(activeSchedule?.courses || [])}
              height={300}
            />
          </div>

          {/* Credits Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              توزیع واحدها
            </h3>
            <Chart
              type="pie"
              data={getCreditsDistribution(activeSchedule?.courses || [])}
              height={300}
            />
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                فعالیت‌های اخیر
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      درس "ریاضی عمومی ۱" اضافه شد
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ۲ ساعت پیش
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      تداخل زمانی در روز دوشنبه شناسایی شد
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ۵ ساعت پیش
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      برنامه "ترم پاییز ۱۴۰۳" ایجاد شد
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      دیروز
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                عملیات سریع
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                  <BookOpenIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    افزودن درس
                  </span>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                  <CalendarDaysIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    برنامه جدید
                  </span>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                  <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    بررسی تداخل
                  </span>
                </button>
                <button className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center">
                  <ChartBarIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    گزارش‌ها
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Helper functions
function calculateClassHours(courses: any[]): number {
  return courses.reduce((total, course) => {
    return total + course.timeSlots.reduce((courseTotal: number, slot: any) => {
      const start = parseTime(slot.startTime)
      const end = parseTime(slot.endTime)
      return courseTotal + (end - start)
    }, 0)
  }, 0)
}

function getUniqueInstructors(courses: any[]): string[] {
  return [...new Set(courses.map(course => course.instructor))]
}

function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours + minutes / 60
}

function getWeeklyScheduleData(courses: any[]) {
  const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه']
  const data = days.map(day => ({
    day,
    hours: courses.reduce((total, course) => {
      return total + course.timeSlots
        .filter((slot: any) => slot.day === day)
        .reduce((dayTotal: number, slot: any) => {
          const start = parseTime(slot.startTime)
          const end = parseTime(slot.endTime)
          return dayTotal + (end - start)
        }, 0)
    }, 0)
  }))
  
  return {
    labels: data.map(d => d.day),
    datasets: [{
      label: 'ساعات کلاس',
      data: data.map(d => d.hours),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1
    }]
  }
}

function getCreditsDistribution(courses: any[]) {
  const creditCounts = courses.reduce((acc, course) => {
    acc[course.credits] = (acc[course.credits] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  return {
    labels: Object.keys(creditCounts).map(c => `${c} واحد`),
    datasets: [{
      data: Object.values(creditCounts),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ]
    }]
  }
}

export default Dashboard"""

# Save React components
import json
with open('react_components_complete.json', 'w', encoding='utf-8') as f:
    json.dump(react_components, f, ensure_ascii=False, indent=2)

print("✅ React Components کامل شد!")
print("=" * 60)
print("📁 React Components Created:")
print("   ✓ Layout.tsx - لایوت اصلی RTL")
print("   ✓ Header.tsx - هدر با منوی کاربر")
print("   ✓ Sidebar.tsx - منوی کناری")
print("   ✓ Loading.tsx - کامپوننت لودینگ")
print("   ✓ Button.tsx - دکمه سفارشی")
print("   ✓ Dashboard.tsx - داشبورد کامل")
print("=" * 60)
print("🎉 تمام فایل‌های کلیدی آماده شد!")
print("📦 Total Files Created: 50+ files")
print("🚀 Ready for development!")