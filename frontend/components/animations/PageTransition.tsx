import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 1.02,
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
};

export const PageTransition: React.FC<PageTransitionProps> = ({
                                                                  children,
                                                                  className = ''
                                                              }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Alternative page transitions
export const SlidePageTransition: React.FC<PageTransitionProps> = ({
                                                                       children,
                                                                       className = ''
                                                                   }) => {
    const slideVariants = {
        initial: {
            opacity: 0,
            x: '100%',
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: '-100%',
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={slideVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const FadePageTransition: React.FC<PageTransitionProps> = ({
                                                                      children,
                                                                      className = ''
                                                                  }) => {
    const fadeVariants = {
        initial: {
            opacity: 0,
        },
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={fadeVariants}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;