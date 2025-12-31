import { AnimatePresence, motion } from "framer-motion";
import { FiCreditCard, FiFile, FiHeart, FiShoppingBag } from "react-icons/fi";
import { Outlet, useLocation } from "react-router-dom";
import authImage from "../assets/images/product_001.jpg";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-white flex h-screen overflow-hidden font-primary">
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-linear-to-bl from-primary/60 to-accent/80 z-10"></div>
        <div className="h-full flex items-center justify-center relative z-0">
          <img
            src={authImage}
            alt="Fashion illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center text-white z-20 p-8">
          <p className="text-lg opacity-80 font-accent mb-4 text-gray-100">
            Your Style, Your Way
          </p>

          <h1 className="text-5xl font-bold mb-8 ">
            Patrick Cavanni Wardrobe, where creativity meets craftsmanship.
          </h1>

          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2">
              <FiFile />
              <span>Discover latest news and exclusive offers.</span>
            </div>
            <div className="flex items-center gap-2">
              <FiShoppingBag />
              <span>View your order history and saved addresses.</span>
            </div>
            <div className="flex items-center gap-2 ">
              <FiHeart />
              <span>Save items to your Wishlist.</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCreditCard />
              <span>Checkout faster.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col h-screen overflow-y-auto scrollbar-hide">
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-md min-h-full flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
