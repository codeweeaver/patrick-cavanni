import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const DropDown = ({ isOpen, onClose, links }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-10 w-48 rounded-md shadow-lg bg-gray-50 focus:outline-none z-50"
          onMouseLeave={onClose}
        >
          <div className="py-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center px-4 py-2 text-sm ${
                  link.btnActive
                    ? "justify-center bg-primary my-4 mx-6 rounded-md text-gray-100 hover:text-white"
                    : location.pathname === link.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                } `}
              >
                <span
                  className={`${
                    link.btnActive
                      ? "mr-2 text-gray-100 group-hover:text-white border-b-2 border-gray-100"
                      : "mr-3 text-gray-500 group-hover:text-primary"
                  }`}
                >
                  {link.icon}
                </span>
                {link.text}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropDown;
