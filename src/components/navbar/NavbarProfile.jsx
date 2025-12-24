import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaHeadset } from "react-icons/fa6";
import {
  FiArrowUpCircle,
  FiChevronDown,
  FiHeart,
  FiLogOut,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavbarProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  console.log(user);

  // Animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
      >
        <div className="relative">
          <img
            src="https://i.pravatar.cc/150?u=mahamud"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-primary object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        <FiChevronDown
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside to close backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20"
            >
              <div className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?u=mahamud"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                {/* Header Info (Mobile style) */}
                <div className="border-b border-gray-50 md:hidden">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Menu Groups */}
              <div className="p-2">
                <DropdownItem
                  to="/profile"
                  variants={itemVariants}
                  icon={<FiUser />}
                  label="View Profile"
                  onClick={() => setIsOpen(false)}
                />
                <DropdownItem
                  to="settings"
                  variants={itemVariants}
                  icon={<FiSettings />}
                  label="Account Settings"
                  onClick={() => setIsOpen(false)}
                />
                <DropdownItem
                  to="wishlist"
                  variants={itemVariants}
                  icon={<FiHeart />}
                  label="Wishlist"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="p-2 border-t border-gray-50">
                <DropdownItem
                  to="/help-center"
                  variants={itemVariants}
                  icon={<FaHeadset />}
                  label="Support"
                  onClick={() => setIsOpen(false)}
                />
                <DropdownItem
                  to="upgrade"
                  variants={itemVariants}
                  icon={<FiArrowUpCircle />}
                  label="Upgrade Account"
                  isAccent
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="p-2 border-t border-gray-50 bg-gray-50/50">
                <button
                  onClick={logOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <FiLogOut className="text-lg" />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownItem = ({
  to,
  icon,
  label,
  isAccent = false,
  variants,
  onClick,
}) => {
  return (
    <motion.div variants={variants} whileHover={{ x: 5 }}>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => `
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-primary/10 text-primary"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }
          ${isAccent && !isActive ? "text-accent hover:bg-accent/5" : ""}
        `}
      >
        {({ isActive }) => (
          <>
            <span
              className={`text-lg ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              {icon}
            </span>
            {label}
            {isAccent && (
              <span className="ml-auto text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Pro
              </span>
            )}
          </>
        )}
      </NavLink>
    </motion.div>
  );
};

export default NavbarProfile;
