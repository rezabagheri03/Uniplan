import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
    className?: string;
    color?: 'primary' | 'secondary' | 'white' | 'gray';
}

export const Loading: React.FC<LoadingProps> = ({
                                                    size = 'md',
                                                    variant = 'spinner',
                                                    className = '',
                                                    color = 'primary',
                                                }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const colorClasses = {
        primary: 'text-primary-500',
        secondary: 'text-secondary-500',
        white: 'text-white',
        gray: 'text-gray-500',
    };

    if (variant === 'spinner') {
        return (
            <motion.div
                className={clsx(
                    'inline-block border-2 border-current border-t-transparent rounded-full',
                    sizeClasses[size],
                    colorClasses[color],
                    className
                )}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        );
    }

    if (variant === 'dots') {
        const dotSize = {
            sm: 'w-1 h-1',
            md: 'w-2 h-2',
            lg: 'w-3 h-3',
            xl: 'w-4 h-4',
        };

        return (
            <div className={clsx('flex space-x-1', className)}>
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={clsx(
                            'rounded-full bg-current',
                            dotSize[size],
                            colorClasses[color]
                        )}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'pulse') {
        return (
            <motion.div
                className={clsx(
                    'rounded-full bg-current',
                    sizeClasses[size],
                    colorClasses[color],
                    className
                )}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            />
        );
    }

    if (variant === 'bars') {
        const barWidth = {
            sm: 'w-0.5',
            md: 'w-1',
            lg: 'w-1.5',
            xl: 'w-2',
        };

        const barHeight = {
            sm: 'h-4',
            md: 'h-8',
            lg: 'h-12',
            xl: 'h-16',
        };

        return (
            <div className={clsx('flex items-end space-x-1', className)}>
                {[0, 1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className={clsx(
                            'bg-current rounded-sm',
                            barWidth[size],
                            barHeight[size],
                            colorClasses[color]
                        )}
                        animate={{
                            scaleY: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.1,
                        }}
                    />
                ))}
            </div>
        );
    }

    return null;
};

interface FullPageLoadingProps {
    text?: string;
    variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
}

export const FullPageLoading: React.FC<FullPageLoadingProps> = ({
                                                                    text = 'بارگذاری...',
                                                                    variant = 'spinner',
                                                                }) => {
    return (
        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
                <Loading size="xl" variant={variant} />
                <motion.p
                    className="mt-4 text-lg text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {text}
                </motion.p>
            </div>
        </div>
    );
};

export const InlineLoading: React.FC<{ text?: string }> = ({
                                                               text = 'بارگذاری...',
                                                           }) => {
    return (
        <div className="flex items-center justify-center py-8">
            <Loading size="md" className="ml-3" />
            <span className="text-gray-600 dark:text-gray-400">{text}</span>
        </div>
    );
};

export default Loading;