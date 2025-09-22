import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    icon?: ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  size = 'md',
                                                  loading = false,
                                                  icon,
                                                  className = '',
                                                  fullWidth = false,
                                                  disabled,
                                                  ...props
                                              }) => {
    const baseClasses = [
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth && 'w-full',
    ];

    const variantClasses = {
        primary: [
            'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
            'hover:from-primary-600 hover:to-secondary-600',
            'focus:ring-primary-500',
            'shadow-lg hover:shadow-xl',
        ],
        secondary: [
            'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white',
            'hover:bg-gray-300 dark:hover:bg-gray-600',
            'focus:ring-gray-500',
        ],
        ghost: [
            'bg-transparent text-gray-700 dark:text-gray-300',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:ring-gray-500',
        ],
        danger: [
            'bg-gradient-to-r from-red-500 to-pink-500 text-white',
            'hover:from-red-600 hover:to-pink-600',
            'focus:ring-red-500',
            'shadow-lg hover:shadow-xl',
        ],
        success: [
            'bg-gradient-to-r from-green-500 to-teal-500 text-white',
            'hover:from-green-600 hover:to-teal-600',
            'focus:ring-green-500',
            'shadow-lg hover:shadow-xl',
        ],
        warning: [
            'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
            'hover:from-yellow-600 hover:to-orange-600',
            'focus:ring-yellow-500',
            'shadow-lg hover:shadow-xl',
        ],
    };

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm min-h-[32px]',
        md: 'px-4 py-2.5 text-base min-h-[40px]',
        lg: 'px-6 py-3 text-lg min-h-[48px]',
        xl: 'px-8 py-4 text-xl min-h-[56px]',
    };

    const classes = clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
    );

    const buttonContent = (
        <>
            {loading ? (
                <div className="flex items-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    در حال بارگذاری...
                </div>
            ) : (
                <>
                    {icon && <span className="ml-2">{icon}</span>}
                    {children}
                </>
            )}
        </>
    );

    return (
        <motion.button
            className={classes}
            disabled={disabled || loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {buttonContent}
        </motion.button>
    );
};

export default Button;