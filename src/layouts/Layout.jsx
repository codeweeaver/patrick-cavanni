// src/layouts/Layout.jsx
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/global/ScrollToTop";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="text-gray-600 bg-gray-50 min-h-screen font-primary">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <main className="min-h-[calc(100vh-200px)]">
          <Outlet key={location.pathname} />
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
