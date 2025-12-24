// c:/Users/CODEWEEAVER/Desktop/react-wp-app/patrick-cavanni/src/components/navbar/NavbarSearch.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const NavbarSearch = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Clear search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center py-20 px-4 sm:px-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Header */}
            <div className="flex items-center p-6 border-b border-gray-100 gap-4">
              <FiSearch className="text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search collections, products, or brands..."
                className="flex-1 text-xl font-light outline-none text-gray-900 placeholder-gray-400 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Search Results Area */}
            <div className="overflow-y-auto p-6 min-h-[300px]">
              {searchTerm.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 pb-2 border-b border-gray-50">
                    <span>Search results for "{searchTerm}"</span>
                    <span>0 found</span>
                  </div>
                  <div className="py-12 text-center text-gray-500">
                    <p>No products found matching your criteria.</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="text-gray-900 font-medium mb-2">
                    What are you looking for?
                  </h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Explore our latest collections, trending items, and
                    exclusive offers.
                  </p>
                </div>
              )}
            </div>

            {/* Footer/Quick Links */}
            <div className="bg-gray-50/80 p-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">
                  Trending Now:
                </span>
                {[
                  "Summer Collection",
                  "Slim Fit Jeans",
                  "Dresses",
                  "Leather Shoes",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavbarSearch;
