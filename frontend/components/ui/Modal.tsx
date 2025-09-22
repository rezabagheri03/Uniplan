import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                children,
                                                title,
                                                size = 'md',
                                                className = '',
                                                closeOnOverlayClick = true,
                                                closeOnEscape = true,
                                                showCloseButton = true,
                                            }) => {
    useEffect(() => {
        if (closeOnEscape) {
            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === 'Escape' && isOpen) {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose, closeOnEscape]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        onClick={closeOnOverlayClick ? onClose : undefined}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className={clsx(
                            'relative w-full glass-effect rounded-2xl shadow-2xl',
                            sizeClasses[size],
                            className
                        )}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-6 pb-4">
                                {title && (
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className={title || showCloseButton ? 'px-6 pb-6' : 'p-6'}>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const ModalHeader: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                       children,
                                                                                       className = '',
                                                                                   }) => (
    <div className={clsx('pb-4 border-b border-gray-200 dark:border-gray-700', className)}>
        {children}
    </div>
);

export const ModalBody: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                     children,
                                                                                     className = '',
                                                                                 }) => (
    <div className={clsx('py-4', className)}>
        {children}
    </div>
);

export const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({
                                                                                       children,
                                                                                       className = '',
                                                                                   }) => (
    <div className={clsx('pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3 space-x-reverse', className)}>
        {children}
    </div>
);

export default Modal;