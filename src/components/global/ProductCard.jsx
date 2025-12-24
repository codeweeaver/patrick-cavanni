import { motion } from "framer-motion";
import { FiEye, FiHeart, FiShoppingCart } from "react-icons/fi";

const ProductCard = ({
  children,
  className = "",
  title,
  image,
  imageAlt = "",
  price,
  originalPrice,
  rating,
  onAddToCart,
  onViewDetails,
  onAddToWishlist,
  isInWishlist = false,
  isInCart = false,
  badge,
  hoverEffect = true,
  delay = 0,
  padding = "p-4",
  rounded = "rounded-lg",
  shadow = "shadow-md hover:shadow-lg",
  border = "border border-gray-100",
  inStock,
  ...props
}) => {
  return (
    <motion.article
      className={`group bg-white ${rounded} ${shadow} ${border} overflow-hidden transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
      {...props}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {image && (
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={image}
              alt={imageAlt || title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}

        {/* Discount Badge */}
        {badge && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}

        {/* Quick Actions */}
        {!inStock ? (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <span className="bg-gray-100 text-gray-600 py-1 px-4 rounded-2xl">
              Out Of Stock
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={onAddToCart}
              className="p-2 bg-white rounded-full text-gray-800 hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={onViewDetails}
              className="p-2 bg-white rounded-full text-gray-800 hover:bg-primary hover:text-white transition-colors"
              aria-label="View details"
            >
              <FiEye className="w-5 h-5" />
            </button>
            <button
              onClick={onAddToWishlist}
              className={`p-2 rounded-full transition-colors ${
                isInWishlist
                  ? "text-red-500 bg-white"
                  : "text-gray-800 bg-white hover:bg-primary hover:text-white"
              }`}
              aria-label={
                isInWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <FiHeart
                className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={padding}>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">{title}</h3>
          {price && (
            <div className="flex flex-col items-end">
              <span className="font-bold text-lg text-gray-900">
                ${price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-sm text-accent line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Rating */}
        {rating && (
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Additional Content */}
        {children && (
          <div className="mt-2 text-sm text-gray-600">{children}</div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
