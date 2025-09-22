import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { coursesAPI } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import { FadeIn } from '@/components/animations/FadeIn';
import { FloatingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { PageTransition } from '@/components/animations/PageTransition';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loading, FullPageLoading } from '@/components/ui/Loading';
import { BookOpen, Clock, Users, Star, Search, Filter, Grid, List } from 'lucide-react';
import { toPersianNumbers } from '@/utils/persian';
import toast from 'react-hot-toast';

interface Course {
    id: string;
    title: string;
    code: string;
    description: string;
    instructor: string;
    duration: string;
    students: number;
    rating: number;
    level: 'مقدماتی' | 'متوسط' | 'پیشرفته';
    category: string;
    image?: string;
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchCourses();
        }
    }, [user, authLoading, router]);

    const fetchCourses = async () => {
        try {
            const response = await coursesAPI.getAll();
            setCourses(response.data);
        } catch (err: any) {
            setError('خطا در دریافت لیست دروس');
            toast.error('خطا در دریافت لیست دروس');
            // Demo data fallback
            setCourses([
                {
                    id: '1',
                    title: 'ریاضی پیشرفته',
                    code: 'MATH-401',
                    description: 'درس جامع ریاضیات پیشرفته شامل حسابان و جبر خطی',
                    instructor: 'دکتر احمدی',
                    duration: '۳ ساعت',
                    students: 45,
                    rating: 4.8,
                    level: 'پیشرفته',
                    category: 'علوم پایه'
                },
                {
                    id: '2',
                    title: 'برنامه‌نویسی وب',
                    code: 'CS-301',
                    description: 'آموزش کامل توسعه وب با React و Next.js',
                    instructor: 'مهندس محمدی',
                    duration: '۴ ساعت',
                    students: 38,
                    rating: 4.9,
                    level: 'متوسط',
                    category: 'کامپیوتر'
                },
                {
                    id: '3',
                    title: 'طراحی UI/UX',
                    code: 'DES-201',
                    description: 'اصول و تکنیک‌های طراحی رابط کاربری مدرن',
                    instructor: 'استاد رضایی',
                    duration: '۲ ساعت',
                    students: 52,
                    rating: 4.7,
                    level: 'مقدماتی',
                    category: 'طراحی'
                },
                {
                    id: '4',
                    title: 'فیزیک کوانتوم',
                    code: 'PHYS-501',
                    description: 'مبانی فیزیک کوانتوم و کاربردهای آن',
                    instructor: 'پروفسور کریمی',
                    duration: '۳ ساعت',
                    students: 28,
                    rating: 4.6,
                    level: 'پیشرفته',
                    category: 'علوم پایه'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...new Set(courses.map(course => course.category))];

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'مقدماتی': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'متوسط': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'پیشرفته': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    if (authLoading || loading) return <FullPageLoading text="بارگذاری دروس..." />;
    if (!user) return null;

    return (
        <PageTransition>
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center relative">
                    <FloatingElement delay={0}>
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity
                            }}
                        >
                            📚
                        </motion.div>
                    </FloatingElement>

                    <FadeIn direction="up" delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
                            دروس آموزشی
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            مجموعه‌ای از بهترین دروس آموزشی برای ارتقای مهارت‌های شما
                        </p>
                    </FadeIn>
                </div>

                {/* Filters */}
                <FadeIn direction="up" delay={0.4}>
                    <Card variant="glass" padding="md">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="جستجوی درس یا استاد..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <Filter className="w-5 h-5 text-gray-500" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="all">همه دسته‌ها</option>
                                    {categories.slice(1).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all duration-300 ${
                                        viewMode === 'grid'
                                            ? 'bg-primary-500 text-white'
                                            : 'text-gray-500 hover:text-primary-500'
                                    }`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-all duration-300 ${
                                        viewMode === 'list'
                                            ? 'bg-primary-500 text-white'
                                            : 'text-gray-500 hover:text-primary-500'
                                    }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </FadeIn>

                {/* Course Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {[
                        { label: 'کل دروس', value: toPersianNumbers(courses.length.toString()), icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
                        { label: 'دروس فعال', value: toPersianNumbers((courses.length - 1).toString()), icon: Star, color: 'from-green-500 to-teal-500' },
                        { label: 'استادان', value: toPersianNumbers('۱۲'), icon: Users, color: 'from-purple-500 to-pink-500' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                        >
                            <GlowingElement delay={index * 0.2}>
                                <Card variant="neumorphism" className="text-center">
                                    <CardBody>
                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                            <stat.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {stat.value}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {stat.label}
                                        </p>
                                    </CardBody>
                                </Card>
                            </GlowingElement>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Error State */}
                {error && (
                    <FadeIn direction="up">
                        <Card variant="default" padding="lg" className="text-center">
                            <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
                            <h3 className="text-xl font-semibold text-yellow-600 mb-2">اتصال به سرور</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">از داده‌های نمونه استفاده می‌شود</p>
                            <Button onClick={fetchCourses} variant="primary">
                                تلاش مجدد
                            </Button>
                        </Card>
                    </FadeIn>
                )}

                {/* Courses Grid/List */}
                <motion.div
                    className={viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                        : 'space-y-6'
                    }
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {filteredCourses.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                درسی یافت نشد
                            </h3>
                            <p className="text-gray-500">
                                لطفاً کلمات کلیدی دیگری را امتحان کنید
                            </p>
                        </div>
                    ) : (
                        filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <Card
                                    variant="neumorphism"
                                    className={`hover-scale cursor-pointer h-full ${
                                        viewMode === 'list' ? 'lg:flex lg:items-center' : ''
                                    }`}
                                    onClick={() => router.push(`/courses/${course.id}`)}
                                >
                                    {viewMode === 'grid' ? (
                                        <>
                                            <CardHeader>
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                                        {course.level}
                                                    </div>
                                                    <div className="flex items-center text-yellow-500">
                                                        <Star className="w-4 h-4 fill-current mr-1" />
                                                        <span className="text-sm font-medium">{toPersianNumbers(course.rating.toString())}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-1">کد درس: {course.code}</p>
                                                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                                    استاد: {course.instructor}
                                                </p>
                                            </CardHeader>

                                            <CardBody>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                                    {course.description}
                                                </p>

                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {course.duration}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {toPersianNumbers(course.students.toString())} دانشجو
                                                    </div>
                                                </div>
                                            </CardBody>

                                            <CardFooter>
                                                <Button variant="primary" className="w-full">
                                                    <BookOpen className="w-4 h-4 mr-2" />
                                                    مشاهده جزئیات
                                                </Button>
                                            </CardFooter>
                                        </>
                                    ) : (
                                        <div className="lg:flex lg:items-center lg:space-x-6 lg:space-x-reverse p-6">
                                            <div className="flex-1 mb-4 lg:mb-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                                                        {course.level}
                                                    </div>
                                                    <div className="flex items-center text-yellow-500">
                                                        <Star className="w-4 h-4 fill-current mr-1" />
                                                        <span className="text-sm font-medium">{toPersianNumbers(course.rating.toString())}</span>
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {course.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-1">کد درس: {course.code}</p>
                                                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                                                    استاد: {course.instructor}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                                    {course.description}
                                                </p>
                                            </div>

                                            <div className="lg:flex lg:flex-col lg:items-end lg:space-y-2">
                                                <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-2 text-sm text-gray-500">
                                                    <div className="flex items-center lg:justify-end">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {course.duration}
                                                    </div>
                                                    <div className="flex items-center lg:justify-end">
                                                        <Users className="w-4 h-4 mr-1" />
                                                        {toPersianNumbers(course.students.toString())} دانشجو
                                                    </div>
                                                </div>
                                                <Button variant="primary" size="sm" className="mt-4 lg:mt-0">
                                                    <BookOpen className="w-4 h-4 mr-2" />
                                                    جزئیات
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </PageTransition>
    );
}