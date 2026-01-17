// c:/Users/CODEWEEAVER/Desktop/react-wp-app/patrick-cavanni/src/components/navbar/NavbarSearch.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const NavbarSearch = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Prevent body scroll when search is open
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

  // Clear search when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 py-20 sm:px-6">
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
            className="relative flex max-h-[75vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 border-b border-gray-100 p-6">
              <FiSearch className="h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections, products, or brands..."
                className="flex-1 bg-transparent text-xl font-light text-gray-900 placeholder-gray-400 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-red-500"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Search Results Area */}
            <div className="min-h-[300px] overflow-y-auto p-6">
              {searchTerm.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-50 pb-2 text-sm text-gray-500">
                    <span>Search results for "{searchTerm}"</span>
                    <span>0 found</span>
                  </div>
                  <div className="py-12 text-center text-gray-500">
                    <p>No products found matching your criteria.</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <h3 className="mb-2 font-medium text-gray-900">What are you looking for?</h3>
                  <p className="mx-auto max-w-xs text-sm text-gray-500">
                    Explore our latest collections, trending items, and exclusive offers.
                  </p>
                </div>
              )}
            </div>

            {/* Footer/Quick Links */}
            <div className="border-t border-gray-100 bg-gray-50/80 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Trending Now:
                </span>
                {['Summer Collection', 'Slim Fit Jeans', 'Dresses', 'Leather Shoes'].map((tag) => (
                  <button
                    key={tag}
                    className="hover:border-primary hover:text-primary rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition-all duration-200 hover:shadow-sm"
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
