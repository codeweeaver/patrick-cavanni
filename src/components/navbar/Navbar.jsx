import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import NavbarRight from "../navbar/NavbarRight.jsx";
import NavbarLinks from "./NavbarLinks.jsx";
import NavbarSearch from "./NavbarSearch";

//import images
import slideImage1 from "../../assets/images/product_002.jpg";
import slideImage3 from "../../assets/images/product_003.jpg";
import slideImage2 from "../../assets/images/product_004.jpg";
import MoblieNavbar from "./MoblieNavbar.jsx";
import NavbarLeft from "./NavbarLeft.jsx";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const pageNavLinks = [
    { name: "HOME", path: "/" },
    { name: "STORE", path: "/products" },
    {
      name: "CAVANNI WARDROBE",
      path: "/collections",
      dropdown: {
        slides: [
          {
            image: slideImage2,
            title: "New Arrivals",
          },
          {
            image: slideImage1,
            title: "Summer Collection",
          },
          {
            image: slideImage3,
            title: "Special Offers",
          },
        ],
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

  return (
    <>
      <nav
        className="bg-white shadow-sm sticky w-full z-20 top-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Headers Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4">
            {/* Navbar Left */}
            <NavbarLeft
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Nav Links */}
            <NavbarLinks pageNavLinks={pageNavLinks} />

            {/* Navbar Right Seation */}
            <NavbarRight
              containerVariants={containerVariants}
              itemVariants={itemVariants}
              toggleSearch={() => setShowSearch(!showSearch)}
            />
          </div>
        </div>
      </nav>
      {/* Search Component */}
      <NavbarSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MoblieNavbar
            pageNavLinks={pageNavLinks}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
