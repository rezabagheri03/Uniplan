import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    intensity?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
                                                                    children,
                                                                    delay = 0,
                                                                    duration = 4,
                                                                    className = '',
                                                                    intensity = 10,
                                                                }) => {
    const floatingVariants = {
        animate: {
            y: [-intensity, intensity, -intensity],
            x: [-intensity/2, intensity/2, -intensity/2],
            transition: {
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={floatingVariants}
            animate="animate"
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const PulsatingElement: React.FC<FloatingElementProps> = ({
                                                                     children,
                                                                     delay = 0,
                                                                     duration = 2,
                                                                     className = '',
                                                                 }) => {
    const pulsatingVariants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={pulsatingVariants}
            animate="animate"
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const GlowingElement: React.FC<FloatingElementProps> = ({
                                                                   children,
                                                                   delay = 0,
                                                                   duration = 3,
                                                                   className = '',
                                                               }) => {
    const glowingVariants = {
        animate: {
            boxShadow: [
                '0 0 20px rgba(14, 165, 233, 0.3)',
                '0 0 30px rgba(14, 165, 233, 0.6)',
                '0 0 20px rgba(14, 165, 233, 0.3)',
            ],
            transition: {
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={glowingVariants}
            animate="animate"
            className={`rounded-lg ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const RotatingElement: React.FC<FloatingElementProps> = ({
                                                                    children,
                                                                    delay = 0,
                                                                    duration = 8,
                                                                    className = '',
                                                                }) => {
    const rotatingVariants = {
        animate: {
            rotate: [0, 360],
            transition: {
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={rotatingVariants}
            animate="animate"
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const BouncingElement: React.FC<FloatingElementProps> = ({
                                                                    children,
                                                                    delay = 0,
                                                                    duration = 2,
                                                                    className = '',
                                                                    intensity = 20,
                                                                }) => {
    const bouncingVariants = {
        animate: {
            y: [0, -intensity, 0],
            transition: {
                duration,
                repeat: Infinity,
                ease: 'easeOut',
                delay,
            },
        },
    };

    return (
        <motion.div
            variants={bouncingVariants}
            animate="animate"
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Magnetic hover effect
interface MagneticElementProps extends FloatingElementProps {
    strength?: number;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
                                                                    children,
                                                                    className = '',
                                                                    strength = 0.2,
                                                                }) => {
    return (
        <motion.div
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
            }}
        >
            {children}
        </motion.div>
    );
};

export default FloatingElement;