import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FloatingElement } from '@/components/animations/FloatingElements';
import { Navbar } from '@/components/Navbar';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-all duration-500">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <FloatingElement delay={0} className="absolute top-20 right-20">
                    <div className="w-64 h-64 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>
                </FloatingElement>
                <FloatingElement delay={1} className="absolute bottom-20 left-20">
                    <div className="w-48 h-48 bg-gradient-to-r from-secondary-400/20 to-primary-400/20 rounded-full blur-3xl"></div>
                </FloatingElement>
                <FloatingElement delay={2} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
                </FloatingElement>
            </div>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-6 py-8">
                {children}
            </main>

            {/* Footer */}
            <motion.footer
                className="relative z-10 glass-effect border-t border-white/20 mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center">
                        <motion.div
                            className="text-2xl mb-4"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            🎓
                        </motion.div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            سامانه آموزشی مدرن با بهترین تجربه کاربری
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            © ۲۰۲۵ تمامی حقوق محفوظ است
                        </p>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
};