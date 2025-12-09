import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiChevronDown,
  FiCreditCard,
  FiGrid,
  FiHeart,
  FiHelpCircle,
  FiLogIn,
  FiMenu,
  FiMessageSquare,
  FiPackage,
  FiSearch,
  FiShoppingBag,
  FiShoppingCart,
  FiTruck,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import DropDown from "./DropDown";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const navItems = [
    {
      id: 1,
      icon: <FiUser size={20} />,
      text: "Account",
      link: "#",
      isDropdown: true,
      sublinks: [
        {
          icon: <FiLogIn size={14} />,
          text: "Sign In",
          path: "/register",
          btnActive: true,
        },
        { icon: <FiGrid size={16} />, text: "Dashboard", path: "/dashboard" },
        { icon: <FiPackage size={16} />, text: "Orders", path: "/orders" },
        { icon: <FiHeart size={16} />, text: "Wishlist", path: "/wishlist" },
      ],
    },
    {
      id: 2,
      icon: <FiHelpCircle size={20} />,
      text: "Help",
      link: "#",
      isDropdown: true,
      sublinks: [
        {
          icon: <FiMessageSquare size={16} />,
          text: "Help center",
          path: "/help-center",
        },
        {
          icon: <FiShoppingBag size={16} />,
          text: "Place an order",
          path: "/help-center/place-order",
        },
        {
          icon: <FiCreditCard size={16} />,
          text: "Payment options",
          path: "/help-center/payment-options",
        },
        {
          icon: <FiTruck size={16} />,
          text: "Track an order",
          path: "/help-center/track-order",
        },
        {
          icon: <FiXCircle size={16} />,
          text: "Cancel an order",
          path: "/help-center/cancel-order",
        },

        {
          icon: <FiXCircle size={14} />,
          text: "Chat AI",
          path: "/help-center/cancel-order",
          btnActive: true,
        },
      ],
    },
    {
      id: 3,
      icon: <FiShoppingCart size={20} />,
      text: "Cart",
      link: "/cart",
      hasCounter: true,
      counter: cartCount,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    hover: { scale: 1.05 },
  };

  const pageNavLinks = [
    { name: "HOME", path: "/" },
    {
      name: "STORE",
      path: "/store",
      dropdown: [
        { name: "All Products", path: "/product?category=all" },
        { name: "New Arrivals", path: "#new" },
        { name: "Best Sellers", path: "#bestsellers" },
        { name: "Haute Culture", path: "#culture" },
        { name: "Exclusive Collections", path: "#collections" },
      ],
    },
    {
      name: "CAVANNI WARDROBE",
      path: "/products",
      dropdown: {
        images: [],
        men: [
          { name: "Clothing", params: "view all" },
          { name: "Shoes", params: "shoes" },
          { name: "Accessories", params: "accessories" },
          { name: "Underwear & Sleepwear", params: "underwear" },
          { name: "Traditional & Cultural Wear", params: "traditional" },
          { name: "T-Shirts", params: "t-shirts" },
          { name: "Polo Shirts", params: "polo-shirts" },
          { name: "Trousers & Chinos", params: "snearks" },
          { name: "Sneakers", params: "sneaks" },
          { name: "Jewelry", params: "jewelry" },
          { name: "Jerseys", params: "Jerseys" },
        ],
        women: [
          { name: "View All", params: "clothing" },
          { name: "Shoes", params: `shoes` },
          { name: "Accessories", params: `accessories` },
          { name: "Jewelry", params: `jewelry` },
          { name: "Handbags & Wallets", params: `bags` },
          { name: "Underwear & Sleepwear", params: `uderwear` },
          { name: "Maternity", params: `matenity` },
          { name: "Dresses", params: `dresses` },
          { name: "Traditional", params: `traditional` },
          { name: "Beach & Swimwear", params: `beach` },
          { name: "Flats", params: `flats` },
          { name: "Women Costumes & Accessories", params: `custumes` },
        ],
        accessories: [],

        brands: [
          { name: "Adidas", params: "adidas" },
          { name: "DeFacto", params: "defacto" },
          { name: "Nike", params: "nike" },
        ],
      },
    },
    { name: "OUR BLOGS", path: "/blogs" },
    { name: "ABOUT US", path: "/about" },
  ];

  return (
    <nav
      className="bg-white shadow-sm sticky w-full z-20 top-0"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Headers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 md:hidden"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>

          {/* Logo */}
          <motion.div
            className="shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="text-2xl font-bold text-primary">
              <img className="h-20 w-20" src={Logo} alt="Patrick Cavanni" />
            </Link>
          </motion.div>

          {/* Desktop Search Bar */}
          <motion.div
            className="hidden md:flex flex-1 items-center justify-center px-2 lg:ml-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="max-w-md w-full lg:max-w-xl">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-24 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Search products, brands and categories"
                  type="search"
                />
                <motion.button
                  className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md text-sm font-medium"
                  whileHover={{ backgroundColor: "#b3883f" }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEARCH
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            className="flex items-center space-x-6 order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mobile Search Icon */}
            <motion.button
              onClick={() => setShowSearch(!showSearch)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-primary md:hidden"
            >
              <FiSearch size={20} />
            </motion.button>

            <span className="h-6 w-px bg-gray-300" />

            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <motion.div
                  className="group flex items-center space-x-1 text-gray-700 cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  onClick={() => item.isDropdown && toggleDropdown(item.id)}
                >
                  <span className="relative text-gray-600 group-hover:text-primary">
                    {item.icon}
                  </span>

                  <span className="text-sm font-medium group-hover:text-primary max-sm:hidden">
                    {item.text}
                  </span>
                  {item.isDropdown && (
                    <motion.span
                      className="ml-1 text-gray-500 group-hover:text-primary mt-1 max-sm:hidden"
                      animate={{
                        rotate: openDropdown === item.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown size={16} />
                    </motion.span>
                  )}

                  {item.hasCounter && item.counter > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-accent group-hover:bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.counter}
                    </motion.span>
                  )}
                </motion.div>
                {item.isDropdown && (
                  <DropDown
                    isOpen={openDropdown === item.id}
                    onClose={() => setOpenDropdown(null)}
                    links={item.sublinks}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Search Bar */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showSearch ? "auto" : 0,
            opacity: showSearch ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-4">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <div className="relative border-t border-gray-200 py-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mobile-search"
                name="search"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400  sm:text-sm"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </div>
        </motion.div>
      </div>
      {/* Page Navigation - Desktop */}
      <div className="hidden md:block bg-white border-t border-gray-100 group/nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-8">
            {pageNavLinks.map((item) => (
              <div key={item.name} className="group">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
              px-1 inline-flex items-center text-sm font-medium leading-[45px] h-12 relative
              ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }
            `}
                >
                  <span className="whitespace-nowrap">
                    {item.name}
                    {item.dropdown && (
                      <FiChevronDown className="ml-1 h-4 w-4 inline transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </span>
                </NavLink>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div
                    className="
              absolute mt-0 w-auto max-w-5xl
              bg-white shadow-lg opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200 ease-out
              pointer-events-none group-hover:pointer-events-auto
              border-t border-gray-100
            "
                  >
                    <div className="p-2">
                      {Array.isArray(item.dropdown) ? (
                        // Simple dropdown (for STORE)
                        <div className="flex flex-col">
                          {item.dropdown.map((subItem, index) => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.path}
                              className="block py-2 px-4 text-sm text-gray-600 hover:text-primary transition-colors hover:bg-gray-50"
                            >
                              <span className="font-medium">
                                {subItem.name}
                              </span>
                            </NavLink>
                          ))}
                        </div>
                      ) : (
                        // Complex dropdown (for CAVANNI WARDROBE)
                        <div className="grid grid-cols-4 gap-8 max-h-[60vh] overflow-y-auto pr-4 px-5">
                          {/* Men's Section */}
                          {item.dropdown.men &&
                            item.dropdown.men.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                                  Men
                                </h3>
                                <div className="space-y-2">
                                  {item.dropdown.men.map((subItem) => (
                                    <NavLink
                                      key={subItem.name}
                                      to={`${item.path}?category=men&type=${subItem.params}`}
                                      className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Women's Section */}
                          {item.dropdown.women &&
                            item.dropdown.women.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                                  Women
                                </h3>
                                <div className="space-y-2">
                                  {item.dropdown.women.map((subItem) => (
                                    <NavLink
                                      key={subItem.name}
                                      to={`${item.path}?category=women&type=${subItem.params}`}
                                      className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Brands Section */}
                          {item.dropdown.brands &&
                            item.dropdown.brands.length > 0 && (
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                                  Brands
                                </h3>
                                <div className="space-y-2">
                                  {item.dropdown.brands.map((subItem) => (
                                    <NavLink
                                      key={subItem.name}
                                      to={`${item.path}?brand=${subItem.params}`}
                                      className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                                    >
                                      {subItem.name}
                                    </NavLink>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col py-4">
            {pageNavLinks.map((item, index) => (
              <div
                key={item.name}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (!item.dropdown) {
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={({ isActive }) => `
                flex-1 py-3 text-sm font-medium
                ${
                  isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                }
              `}
                  >
                    {item.name}
                  </NavLink>
                  {item.dropdown && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMobileDropdown(
                          openMobileDropdown === index ? null : index
                        );
                      }}
                      className="p-2 -mr-2"
                    >
                      <FiChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openMobileDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown Menu */}
                {item.dropdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: openMobileDropdown === index ? "auto" : 0,
                      opacity: openMobileDropdown === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 bg-gray-50">
                      {Array.isArray(item.dropdown) ? (
                        // Simple dropdown (for STORE)
                        <div className="py-2 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <NavLink
                              key={subItem.id}
                              to={`${item.path}?category=${subItem.id}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-primary"
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      ) : (
                        // Complex dropdown (for CAVANNI WARDROBE)
                        <div className="space-y-4 py-2">
                          {Object.entries({
                            men: "Men",
                            women: "Women",
                            brands: "Brands",
                          }).map(
                            ([key, label]) =>
                              item.dropdown[key]?.length > 0 && (
                                <div key={key}>
                                  <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {label}
                                  </h3>
                                  <div className="space-y-1">
                                    {item.dropdown[key].map((subItem) => (
                                      <NavLink
                                        key={subItem.name}
                                        to={`${item.path}?${
                                          key === "brands" ? "brand" : "type"
                                        }=${subItem.params}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-6 py-2 text-sm text-gray-600 hover:text-primary"
                                      >
                                        {subItem.name}
                                      </NavLink>
                                    ))}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
