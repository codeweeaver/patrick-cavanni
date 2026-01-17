import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // Prevent body scroll when modal is open
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-6">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
