import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

import { FiHelpCircle, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import NavbarProfile from "./NavbarProfile";

const NavbarRight = ({ containerVariants, itemVariants, toggleSearch }) => {
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <motion.div
      className="flex items-center space-x-6 order-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Search Icon */}
      <motion.button
        onClick={toggleSearch}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-gray-600 hover:text-primary"
      >
        <FiSearch size={20} />
      </motion.button>

      <span className="h-6 w-px bg-gray-300" />

      <NavLink to="/cart">
        <motion.div
          className="group flex items-center space-x-1 text-gray-700 cursor-pointer relative"
          variants={itemVariants}
          whileHover="hover"
        >
          <span className="relative text-gray-600 group-hover:text-primary">
            <FiShoppingCart size={20} />
          </span>
          <span className="text-sm font-medium group-hover:text-primary max-sm:hidden">
            Cart
          </span>
          <span className="absolute -top-3 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center group-hover:bg-primary transition">
            {cartCount}
          </span>
        </motion.div>
      </NavLink>

      <NavLink to="/help-center">
        <motion.div
          className="group flex items-center space-x-1 text-gray-700 cursor-pointer"
          variants={itemVariants}
          whileHover="hover"
        >
          <span className="relative text-gray-600 group-hover:text-primary">
            <FiHelpCircle size={20} />
          </span>
          <span className="text-sm font-medium group-hover:text-primary max-sm:hidden">
            Help
          </span>
        </motion.div>
      </NavLink>

      {user ? (
        <NavbarProfile user={user} />
      ) : (
        <NavLink to="/login">
          <motion.div
            className="group flex items-center space-x-1 text-gray-700 cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
          >
            <span className="relative text-gray-600 group-hover:text-primary">
              <FiUser size={20} />
            </span>
            <span className="text-sm font-medium group-hover:text-primary max-sm:hidden">
              Login
            </span>
          </motion.div>
        </NavLink>
      )}
    </motion.div>
  );
};

export default NavbarRight;
