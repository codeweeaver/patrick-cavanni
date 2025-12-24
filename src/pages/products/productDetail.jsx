import { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingSpinner from "../../components/global/LoadingSpinner";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// Loader function to fetch product data
export const productsDetailLoader = async ({ params }) => {
  const response = await fetch(
    `http://localhost:3000/products/${params.productId}`
  );
  if (!response.ok) {
    throw new Response("Product not found", { status: 404 });
  }
  return await response.json();
};

const ProductDetail = () => {
  const product = useLoaderData();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  // Set default selected size and color when component mounts
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: product.image?.[0],
    });
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Product Image */}
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Swiper
              loop={false}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="w-full h-full"
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-pagination-color": "#000",
              }}
            >
              {product.image?.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FiHeart
                className={`w-5 h-5 ${
                  isFavorite ? "text-red-500 fill-current" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="px-2 mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="product-thumbs"
            >
              {product.image?.map((img, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden border-2 border-transparent hover:border-gray-300 transition-colors">
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                ${product.price?.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="ml-2 text-green-600 font-medium">
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
            {!product.inStock && (
              <span className="text-red-500 text-sm mt-1">Out of Stock</span>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Categories */}
          {product.categories?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-l-md hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border rounded-r-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-8 py-3 rounded-md flex-1 flex items-center justify-center gap-2 ${
                product.inStock
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiShoppingCart className="w-5 h-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>
            <button
              className="border border-black px-8 py-3 rounded-md hover:bg-gray-50 transition-colors flex-1"
              disabled={!product.inStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
