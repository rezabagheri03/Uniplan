import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeInProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
                                                  children,
                                                  direction = 'up',
                                                  delay = 0,
                                                  duration = 0.6,
                                                  distance = 50,
                                                  className = '',
                                                  once = true,
                                              }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    const directionVariants = {
        up: { y: distance, opacity: 0 },
        down: { y: -distance, opacity: 0 },
        left: { x: distance, opacity: 0 },
        right: { x: -distance, opacity: 0 },
    };

    const variants = {
        hidden: directionVariants[direction],
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Staggered fade in for lists
interface StaggeredFadeInProps {
    children: ReactNode[];
    className?: string;
    staggerDelay?: number;
    childDelay?: number;
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({
                                                                    children,
                                                                    className = '',
                                                                    staggerDelay = 0.1,
                                                                    childDelay = 0,
                                                                }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: childDelay,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {children.map((child, index) => (
                <motion.div key={index} variants={itemVariants}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

export default FadeIn;