import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

import hauteCoutureImage from "../../assets/images/haute-couture.jpg";

const HauteCouture = () => {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Image */}
          <motion.div
            className="relative h-[350px] md:h-[500px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={hauteCoutureImage}
              alt="Haute Couture Collection"
              className="w-full h-full object-cover object-[0_10%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
              <span className="text-xs md:text-sm font-medium tracking-widest text-amber-200">
                NEW COLLECTION
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-0.5 md:mt-1">
                Spring/Summer 2025
              </h3>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-base md:text-lg font-medium text-primary/80 font-accent">
              HAUTE COUTURE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 mb-4 md:mb-6 text-gray-900">
              Elegance Redefined
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
              Experience the epitome of luxury with our exclusive haute couture
              collection. Each piece is meticulously crafted with the finest
              materials and attention to detail, designed to make a statement
              wherever you go.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="shrink-0 mt-0.5 md:mt-1">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-400 flex items-center justify-center">
                    <FaCheck className="text-white text-xs md:text-sm" />
                  </div>
                </div>
                <p className="ml-3 text-sm md:text-base text-gray-600">
                  Handcrafted by master artisans with decades of experience
                </p>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 mt-0.5 md:mt-1">
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-400 flex items-center justify-center">
                    <FaCheck className="text-white text-xs md:text-sm" />
                  </div>
                </div>
                <p className="ml-3 text-sm md:text-base text-gray-600">
                  Made with sustainable and ethically sourced materials
                </p>
              </div>
            </div>

            <Link
              to="/collection"
              className="inline-flex items-center px-6 py-2.5 md:px-8 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-white bg-gray-900 hover:bg-primary transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              Explore Collection
              <svg
                className="ml-2 -mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HauteCouture;
