import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { schedulesAPI } from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import { FadeIn } from '@/components/animations/FadeIn';
import { FloatingElement, GlowingElement } from '@/components/animations/FloatingElements';
import { PageTransition } from '@/components/animations/PageTransition';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FullPageLoading } from '@/components/ui/Loading';
import { Calendar, Clock, MapPin, User, Filter, Grid, List, Plus } from 'lucide-react';
import { toPersianNumbers, persianDays } from '@/utils/persian';
import toast from 'react-hot-toast';

interface Schedule {
    id: string;
    day: string;
    time: string;
    course: string;
    instructor: string;
    room: string;
    type: 'درس' | 'آزمون' | 'تمرین';
    duration: string;
}

export default function SchedulesPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchSchedules();
        }
    }, [user, authLoading, router]);

    const fetchSchedules = async () => {
        try {
            const response = await schedulesAPI.getAll();
            setSchedules(response.data);
        } catch (err: any) {
            setError('خطا در دریافت برنامه زمانی');
            toast.error('خطا در دریافت برنامه زمانی');
        } finally {
            setLoading(false);
        }
    };

    const filteredSchedules = schedules.filter(schedule => {
        const matchesDay = selectedDay === 'all' || schedule.day === selectedDay;
        const matchesType = selectedType === 'all' || schedule.type === selectedType;
        return matchesDay && matchesType;
    });

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'درس': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'آزمون': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'تمرین': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const types = ['درس', 'آزمون', 'تمرین'];

    const getSchedulesByDay = (day: string) => {
        return schedules.filter(schedule => schedule.day === day).sort((a, b) => a.time.localeCompare(b.time));
    };

    if (authLoading || loading) return <FullPageLoading text="بارگذاری برنامه زمانی..." />;
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
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity
                            }}
                        >
                            📅
                        </motion.div>
                    </FloatingElement>

                    <FadeIn direction="up" delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
                            برنامه زمانی کلاس‌ها
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            مدیریت زمان خود را با برنامه هفتگی دروس و فعالیت‌ها
                        </p>
                    </FadeIn>
                </div>

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
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
                        { label: 'کل جلسات', value: toPersianNumbers(schedules.length.toString()), icon: Calendar, color: 'from-blue-500 to-cyan-500' },
                        { label: 'جلسات درس', value: toPersianNumbers(schedules.filter(s => s.type === 'درس').length.toString()), icon: Clock, color: 'from-green-500 to-teal-500' },
                        { label: 'آزمون‌ها', value: toPersianNumbers(schedules.filter(s => s.type === 'آزمون').length.toString()), icon: User, color: 'from-red-500 to-pink-500' },
                        { label: 'تمرین‌ها', value: toPersianNumbers(schedules.filter(s => s.type === 'تمرین').length.toString()), icon: Plus, color: 'from-purple-500 to-indigo-500' },
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

                {/* Filters */}
                <FadeIn direction="up" delay={0.4}>
                    <Card variant="glass" padding="md">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Day Filter */}
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <Filter className="w-5 h-5 text-gray-500" />
                                <select
                                    value={selectedDay}
                                    onChange={(e) => setSelectedDay(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="all">همه روزها</option>
                                    {days.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="flex items-center space-x-4 space-x-reverse">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="all">همه انواع</option>
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`p-2 rounded-md transition-all duration-300 ${
                                        viewMode === 'calendar'
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

                {/* Schedule Display */}
                {error ? (
                    <FadeIn direction="up">
                        <Card variant="default" padding="lg" className="text-center">
                            <div className="text-red-500 text-6xl mb-4">⚠️</div>
                            <h3 className="text-xl font-semibold text-red-600 mb-2">خطا در بارگذاری</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                            <Button onClick={fetchSchedules} variant="primary">
                                تلاش مجدد
                            </Button>
                        </Card>
                    </FadeIn>
                ) : viewMode === 'calendar' ? (
                    /* Calendar View */
                    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                        {days.map((day, dayIndex) => (
                            <motion.div
                                key={day}
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + dayIndex * 0.1 }}
                            >
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl">
                                        {day}
                                    </h3>
                                </div>

                                <div className="space-y-3 min-h-96">
                                    {getSchedulesByDay(day).map((schedule, index) => (
                                        <motion.div
                                            key={schedule.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + dayIndex * 0.1 + index * 0.05 }}
                                        >
                                            <Card
                                                variant="neumorphism"
                                                padding="sm"
                                                className="hover-scale cursor-pointer"
                                                onClick={() => router.push(`/schedules/${schedule.id}`)}
                                            >
                                                <CardBody>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(schedule.type)}`}>
                                {schedule.type}
                              </span>
                                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {toPersianNumbers(schedule.time)}
                              </span>
                                                        </div>

                                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                                                            {schedule.course}
                                                        </h4>

                                                        <div className="space-y-1 text-xs text-gray-500">
                                                            <div className="flex items-center">
                                                                <User className="w-3 h-3 mr-1" />
                                                                {schedule.instructor}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <MapPin className="w-3 h-3 mr-1" />
                                                                {schedule.room}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <Clock className="w-3 h-3 mr-1" />
                                                                {schedule.duration}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </motion.div>
                                    ))}

                                    {getSchedulesByDay(day).length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">برنامه‌ای برای این روز وجود ندارد</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <motion.div
                        className="space-y-4"
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
                        {filteredSchedules.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    برنامه‌ای یافت نشد
                                </h3>
                                <p className="text-gray-500">
                                    فیلترهای انتخابی را تغییر دهید
                                </p>
                            </div>
                        ) : (
                            filteredSchedules.map((schedule, index) => (
                                <motion.div
                                    key={schedule.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <Card
                                        variant="glass"
                                        className="hover-scale cursor-pointer"
                                        onClick={() => router.push(`/schedules/${schedule.id}`)}
                                    >
                                        <CardBody className="lg:flex lg:items-center lg:space-x-6 lg:space-x-reverse p-6">
                                            <div className="flex-1 mb-4 lg:mb-0">
                                                <div className="flex items-center space-x-4 space-x-reverse mb-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(schedule.type)}`}>
                            {schedule.type}
                          </span>
                                                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {schedule.day}
                          </span>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {schedule.course}
                                                </h3>

                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <User className="w-4 h-4 mr-2" />
                                                        {schedule.instructor}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        {schedule.room}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:text-right">
                                                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                                                    {toPersianNumbers(schedule.time)}
                                                </div>
                                                <div className="text-sm text-gray-500 flex items-center lg:justify-end">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {schedule.duration}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </PageTransition>
    );
}