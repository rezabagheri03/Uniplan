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
import { FloatingElement, PulsatingElement } from '@/components/animations/FloatingElements';
import { PageTransition } from '@/components/animations/PageTransition';
import { User, Mail, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const schema = yup.object({
    name: yup.string().min(2, 'نام حداقل ۲ کاراکتر باشد').required('نام الزامی است'),
    email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
    password: yup.string().min(6, 'رمز عبور حداقل ۶ کاراکتر باشد').required('رمز عبور الزامی است'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'تکرار رمز عبور صحیح نیست')
        .required('تکرار رمز عبور الزامی است'),
});

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await authAPI.register(data.name, data.email, data.password);
            setToken(response.data.token);
            toast.success('ثبت نام با موفقیت انجام شد! خوش آمدید 🎉');
            router.push('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'خطا در ثبت نام');
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

                <FadeIn direction="up" className="w-full max-w-lg relative z-10">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    >
                        <Card variant="glass" padding="lg" className="persian-shadow relative overflow-hidden">
                            {/* Decorative gradient */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>

                            <CardHeader>
                                <div className="text-center mb-8">
                                    <FloatingElement>
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
                                            ✨
                                        </motion.div>
                                    </FloatingElement>
                                    <h1 className="text-3xl font-bold text-gradient mb-2">
                                        عضویت در خانواده ما
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        برای شروع سفر یادگیری، ثبت نام کنید
                                    </p>
                                </div>
                            </CardHeader>

                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            نام و نام خانوادگی
                                        </label>
                                        <div className="relative">
                                            <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                {...register('name')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                                placeholder="نام کامل خود را وارد کنید"
                                            />
                                        </div>
                                        {errors.name && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.name.message}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            ایمیل
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                {...register('email')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
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
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            رمز عبور
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                {...register('password')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
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
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            تکرار رمز عبور
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                            <input
                                                type="password"
                                                {...register('confirmPassword')}
                                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        {errors.confirmPassword && (
                                            <motion.p
                                                className="text-red-500 text-sm mt-1"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.confirmPassword.message}
                                            </motion.p>
                                        )}
                                    </div>

                                    <PulsatingElement>
                                        <Button
                                            type="submit"
                                            loading={loading}
                                            className="w-full py-4 text-lg font-semibold"
                                            icon={<Sparkles className="w-5 h-5" />}
                                        >
                                            {loading ? 'در حال ثبت نام...' : 'ثبت نام و شروع'}
                                        </Button>
                                    </PulsatingElement>
                                </form>

                                <div className="mt-8 text-center">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        قبلاً ثبت نام کرده‌اید؟{' '}
                                        <Button
                                            variant="ghost"
                                            onClick={() => router.push('/login')}
                                            className="!p-0 !min-h-0 text-primary-600 hover:text-primary-700 font-medium"
                                        >
                                            وارد شوید
                                        </Button>
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                </FadeIn>
            </div>
        </PageTransition>
    );
}