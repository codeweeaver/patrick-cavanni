import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
  };

  const socialLinks = [
    { name: "facebook", Icon: <FaFacebook size={20} />, path: "#" },
    { name: "twitter", Icon: <FaTwitter size={20} />, path: "#" },
    { name: "youtube", Icon: <FaYoutube size={20} />, path: "#" },
    { name: "instagram", Icon: <FaInstagram size={20} />, path: "#" },
    { name: "tiktok", Icon: <FaTiktok size={20} />, path: "#" },
  ];

  return (
    <footer className="bg-white py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:m-0 text-center md:text-left"
          >
            <NavLink
              className=""
              to="/"
              aria-label="Patrick Cavanni home"
              title="Home"
            >
              <motion.img
                src={Logo}
                alt="Patrick Cavanni — premium leather goods"
                loading="lazy"
                className="w-32 h-auto"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </NavLink>
            <p className="mt-3 text-sm text-gray-600 max-w-60 text-center md:text-left">
              Handcrafted leather goods sustainable materials, timeless design.
            </p>
          </motion.div>

          {/* Services Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:m-0 text-center md:text-left"
          >
            <motion.h3 className="text-xl font-accent italic mb-4 text-primary">
              Access Our !
            </motion.h3>
            <h2 className="text-2xl font-bold mb-6">QUICK LINKS</h2>
            <motion.div
              className="w-12 h-1 mb-6 bg-primary self-center md:self-start"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Blogs",
                "Cavanni Wardrobe",
                "Exclusive Collections",
                "Haute Couture",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="text-gray-700 hover:text-primary cursor-pointer transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:m-0 text-center md:text-left"
          >
            <motion.h3 className="text-xl font-accent italic mb-4 text-primary">
              Talk to Us Now !
            </motion.h3>
            <h2 className="text-2xl font-bold mb-6">CONTACT US</h2>
            <motion.div
              className="w-12 h-1 mb-6 bg-primary self-center md:self-start"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <Link
              to="https://www.google.com/maps/search/?api=1&query=No+8,+Ndele+Street,+Wuse+Zone+3,+FCT+Abuja,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 mb-4 hover:text-primary underline transition-colors"
            >
              <span className="text-xl mr-1">📍</span>
              <span>
                No 8, Ndele Street, <br /> Wuse Zone 3,
                <br />
                FCT Abuja, Nigeria
              </span>
            </Link>
            <Link
              to="tel:+2349087770900"
              className="text-md font-semibold inline-block group mb-3"
            >
              <span className="text-xl mr-1">📞</span>
              <span className="group-hover:underline group-hover:text-primary font-medium">
                +(234) 908 777 0900
              </span>
            </Link>
            <Link
              href="mailto:info@patrickcavanni.com"
              className="text-md inline-flex items-center gap-2 group"
            >
              <span className="text-xl">📧</span>
              <span className="group-hover:underline group-hover:text-primary font-medium">
                info@patrickcavanni.com
              </span>
            </Link>
          </motion.div>

          {/* Social Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:m-0 text-center md:text-left"
          >
            <motion.h3 className="text-xl font-accent italic mb-4 text-primary">
              Get in Touch !
            </motion.h3>
            <h2 className="text-2xl font-bold mb-6">FOLLOW US</h2>
            <motion.div
              className="w-12 h-1 mb-6 bg-primary self-center md:self-start"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
            {/* socials links icons */}
            <div className="flex justify-center gap-6 md:flex-wrap md:justify-start">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  variants={socialVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="md:w-1/4 md:flex-wrap"
                >
                  <NavLink
                    to={link.path}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg text-primary"
                  >
                    {link.Icon}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-200 my-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Copyright Section */}
        <motion.div
          className="text-center py-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={itemVariants} className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Patrick Cavanni. All rights
            reserved.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500 mt-3"
          >
            Designed with <span className="text-red-500">♥</span> by your team
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
