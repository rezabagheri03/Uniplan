import { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    variant?: 'default' | 'glass' | 'neumorphism' | 'gradient' | 'bordered';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
                                              children,
                                              variant = 'default',
                                              padding = 'md',
                                              className = '',
                                              hoverable = false,
                                              ...props
                                          }) => {
    const baseClasses = [
        'rounded-xl transition-all duration-300',
        hoverable && 'hover:shadow-lg hover:-translate-y-1',
    ];

    const variantClasses = {
        default: [
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'shadow-sm',
        ],
        glass: [
            'glass-effect',
            'border border-white/20 dark:border-white/10',
        ],
        neumorphism: [
            'persian-card',
        ],
        gradient: [
            'bg-gradient-to-br from-primary-500 to-secondary-500',
            'text-white',
            'shadow-lg',
        ],
        bordered: [
            'bg-white dark:bg-gray-800',
            'border-2 border-primary-200 dark:border-primary-800',
            'shadow-sm',
        ],
    };

    const paddingClasses = {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
    };

    const classes = clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
    );

    return (
        <motion.div
            className={classes}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                      children,
                                                                                      className = '',
                                                                                  }) => (
    <div className={clsx('pb-4', className)}>
        {children}
    </div>
);

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                    children,
                                                                                    className = '',
                                                                                }) => (
    <div className={clsx('', className)}>
        {children}
    </div>
);

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                      children,
                                                                                      className = '',
                                                                                  }) => (
    <div className={clsx('pt-4', className)}>
        {children}
    </div>
);

export default Card;