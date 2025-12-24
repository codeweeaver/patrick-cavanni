import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-2 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-gray-800 font-medium">{title}</span>
        {isOpen ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-4 text-gray-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
