import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import productImage from "../../assets/images/product_001.jpg";

const products = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: "$249.99",
    image: productImage,
    category: "Dresses",
    rating: 4.8,
  },
  { 
    id: 2,
    name: "Leather Crossbody Bag",
    price: "$179.99",
    image: productImage,
    category: "Bags",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Cashmere Wrap Coat",
    price: "$349.99",
    image: productImage,
    category: "Outerwear",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Embroidered Blouse",
    price: "$89.99",
    image: productImage,
    category: "Tops",
    rating: 4.5,
  },
  {
    id: 5,
    name: "Wide-Leg Trousers",
    price: "$129.99",
    image: productImage,
    category: "Bottoms",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Suede Ankle Boots",
    price: "$199.99",
    image: productImage,
    category: "Shoes",
    rating: 4.8,
  },
];

const JustForYou = () => {
  const swiperRef = useRef(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative">
            Just For You
            <span className="absolute bottom-1/2 translate-y-1/2 -left-4 w-12 h-1 bg-primary/80"></span>
          </h2>
          <Link
            to="products"
            className="text-primary hover:text-primary-dark font-medium"
          >
            View All
          </Link>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            loop={true}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} inline-block w-3 h-3 mx-1 rounded-full bg-primary hover:bg-primary-dark transition-all duration-300"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="pb-10">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="relative pt-[120%]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="mr-1">★</span>
                      {product.rating}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-700">
                      {product.price}
                      <span className="text-xs text-gray-500 ml-5 font-normal">
                        + Free Shipping
                      </span>
                    </p>
                    <button className="mt-3 w-full bg-primary text-gray-50 hover:scale-105 hover:text-white py-2 px-4 rounded-md transition-all duration-200">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation and Pagination */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 custom-pagination" />

            <button
              className="swiper-button-prev absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-gray-100 transition-all duration-300"
              aria-label="Previous slide"
            >
              <FiArrowLeft className="w-full h-full inline-block p-2" />
            </button>

            <button
              className="swiper-button-next absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-gray-100 transition-all duration-300"
              aria-label="Next slide"
            >
              <FiArrowRight className="w-full h-full inline-block p-2" />
            </button>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default JustForYou;
