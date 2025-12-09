import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

import arrivalImage1 from "../../assets/images/arrival-1.jpg";
import arrivalImage2 from "../../assets/images/arrival-2.jpg";
import arrivalImage3 from "../../assets/images/arrival-3.jpg";
import arrivalImage4 from "../../assets/images/arrival-4.jpg";

const NewArrival = () => {
  const products = [
    {
      id: 1,
      name: "21WN reversible angora cardigan",
      price: 29.99,
      originalPrice: 39.99,
      image: arrivalImage1, // Update with your image path
      isNew: true,
    },
    {
      id: 2,
      name: "Women's Summer Dress",
      price: 49.99,
      originalPrice: 69.99,
      image: arrivalImage2, // Update with your image path
      isNew: true,
    },
    {
      id: 3,
      name: "Unisex Sneakers",
      price: 79.99,
      originalPrice: 99.99,
      image: arrivalImage3, // Update with your image path
      isNew: true,
    },
    {
      id: 4,
      name: "Casual Denim Jacket",
      price: 89.99,
      originalPrice: 119.99,
      image: arrivalImage4, // Update with your image path
      isNew: true,
    },
  ];

  return (
    <section id="new" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest collection of trendy fashion items
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Product Badge */}
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                  New
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-accent hover:text-white transition-colors">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-accent hover:text-white transition-colors">
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-md font-medium text-gray-900 mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-5">
                  <span className="text-lg font-bold text-gray-700">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-accent line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-primary hover:scale-105 transition-all"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
