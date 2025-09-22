import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authAPI } from '@/utils/api';
import { setToken } from '@/utils/auth';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { FloatingElement, PulsatingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { PageTransition } from '@/components/animations/PageTransition';
import { Mail, Lock, ArrowLeft, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
    email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
    password: yup.string().min(6, 'رمز عبور حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
});

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await authAPI.login(data.email, data.password);
            setToken(response.data.token);
            toast.success('ورود موفقیت‌آمیز بود! خوش آمدید 🎉');
            router.push('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'خطا در ورود');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex items-center justify-center p-6">
                {/* Background Animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <FloatingElement delay={0}>
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl"></div>
                    </FloatingElement>
                    <FloatingElement delay={1}>
                        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl"></div>
                    </FloatingElement>
                    <FloatingElement delay={2}>
                        <div className="absolute top-1/2 right-1/2 w-48 h-48 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
                    </FloatingElement>
                </div>

                <FadeIn direction="up" className="w-full max-w-md relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <Card variant="glass" padding="lg" className="persian-shadow relative overflow-hidden">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>

                            <CardHeader>
                                <div className="text-center mb-8">
                                    <GlowingElement>
                                        <motion.div
                                            className="text-6xl mb-4"
                                            animate={{
                                                rotate: [0, -5, 5, 0],
                                                scale: [1, 1.1, 1]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        >
                                            🚀
                                        </motion.div>
                                    </GlowingElement>
                                    <motion.h1
                                        className="text-3xl font-bold text-gradient mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        خوش آمدید
                                    </motion.h1>
                                    <motion.p
                                        className="text-gray-600 dark:text-gray-400"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        برای ورود، اطلاعات خود را وارد کنید
                                    </motion.p>
                                </div>
                            </CardHeader>

                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            ایمیل
                                        </label>
                                        <div className="relative group">
                                            <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 hover:border-primary-300"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            رمز عبور
                                        </label>
                                        <div className="relative group">
                                            <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                                            <input
                                                type="password"
                                                {...register('password')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300 hover:border-primary-300"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        {errors.password && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.password.message}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <PulsatingElement>
                                            <Button
                                                type="submit"
                                                loading={loading}
                                                className="w-full py-4 text-lg font-semibold shadow-xl"
                                                icon={<ArrowLeft className="w-5 h-5" />}
                                            >
                                                {loading ? 'در حال ورود...' : 'ورود'}
                                            </Button>
                                        </PulsatingElement>
                                    </motion.div>
                                </form>

                                <motion.div
                                    className="mt-8 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        حساب کاربری ندارید؟
                                    </p>
                                    <Button
                                        variant="ghost"
                                        onClick={() => router.push('/register')}
                                        className="text-primary-600 hover:text-primary-700 font-medium"
                                        icon={<Zap className="w-4 h-4" />}
                                    >
                                        ثبت نام کنید
                                    </Button>
                                </motion.div>

                                {/* Demo credentials note */}
                                <motion.div
                                    className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                                        💡 برای تست: admin@test.com / ۱۲۳۴۵۶
                                    </p>
                                </motion.div>
                            </CardBody>
                        </Card>
                    </motion.div>
                </FadeIn>
            </div>
        </PageTransition>
    );
}