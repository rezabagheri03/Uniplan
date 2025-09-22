import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { FloatingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { Moon, Sun, Home, BookOpen, Calendar, LogIn, LogOut, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

interface NavLinkProps {
    href: string;
    icon: ReactNode;
    children: ReactNode;
    className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children, className = '' }) => {
    const router = useRouter();
    const isActive = router.pathname === href || router.pathname.startsWith(href + '/');

    return (
        <Link href={href}>
            <motion.div
                className={clsx(
                    'flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer',
                    {
                        'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 shadow-lg': isActive,
                        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': !isActive,
                    },
                    className
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <span className="w-5 h-5">{icon}</span>
                <span className="font-medium">{children}</span>
            </motion.div>
        </Link>
    );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, icon, children, className = '' }) => {
    const router = useRouter();
    const isActive = router.pathname === href || router.pathname.startsWith(href + '/');

    return (
        <Link href={href}>
            <motion.div
                className={clsx(
                    'flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer w-full',
                    {
                        'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 shadow-lg': isActive,
                        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': !isActive,
                    },
                    className
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="w-5 h-5">{icon}</span>
                <span className="font-medium">{children}</span>
            </motion.div>
        </Link>
    );
};

export const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
        {/* Main Navigation */}
        <motion.nav
            className="relative z-50 glass-effect border-b border-white/20 backdrop-blur-xl sticky top-0"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <GlowingElement>
                            <motion.div
                                className="flex items-center space-x-3 space-x-reverse cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div
                                    className="text-3xl"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    🌟
                                </motion.div>
                                <h1 className="text-2xl font-bold text-gradient">
                                    سامانه آموزشی
                                </h1>
                            </motion.div>
                        </GlowingElement>
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.div
                        className="hidden md:flex items-center space-x-8 space-x-reverse"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <NavLink href="/" icon={<Home />}>خانه</NavLink>
                        <NavLink href="/courses" icon={<BookOpen />}>دروس</NavLink>
                        <NavLink href="/schedules" icon={<Calendar />}>زمان‌بندی</NavLink>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="flex items-center space-x-4 space-x-reverse"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            title={darkMode ? 'حالت روز' : 'حالت شب'}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>

                        {/* User Actions */}
                        {user ? (
                            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                                <motion.div
                                    className="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    سلام، {user.name}
                                </motion.div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={handleLogout}
                                    icon={<LogOut className="w-4 h-4" />}
                                >
                                    خروج
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.push('/login')}
                                >
                                    ورود
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => router.push('/register')}
                                    icon={<LogIn className="w-4 h-4" />}
                                >
                                    ثبت نام
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                </div>
            </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
            className="md:hidden glass-effect border-t border-white/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{
                height: mobileMenuOpen ? 'auto' : 0,
                opacity: mobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
        >
            <div className="container mx-auto px-6 py-4 space-y-2">
                <MobileNavLink href="/" icon={<Home />}>خانه</MobileNavLink>
                <MobileNavLink href="/courses" icon={<BookOpen />}>دروس</MobileNavLink>
                <MobileNavLink href="/schedules" icon={<Calendar />}>زمان‌بندی</MobileNavLink>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-4">
                    {user ? (
                        <div className="space-y-2">
                            <div className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium bg-gray-100 dark:bg-gray-700 rounded-xl">
                                سلام، {user.name}
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleLogout}
                                className="w-full"
                                icon={<LogOut className="w-4 h-4" />}
                            >
                                خروج
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    router.push('/login');
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full"
                            >
                                ورود
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    router.push('/register');
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full"
                                icon={<LogIn className="w-4 h-4" />}
                            >
                                ثبت نام
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
        </motion.nav>

{/* Mobile Menu Backdrop */}
{mobileMenuOpen && (
        <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
        />
    )}
</>
);
};

export default Navbar;