import { motion } from "framer-motion";
import { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import local hero images
import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";

const heroSlides = [
  {
    id: 1,
    title: "New Collection 2025",
    subtitle: "Discover the latest trends in fashion",
    description: "Up to 30% off on selected items",
    buttonText: "Shop Now",
    buttonLink: "/store",
    image: hero1,
    bgColor: "bg-gray-100",
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Hot deals on summer essentials",
    description: "Free shipping on orders over $50",
    buttonText: "Explore Deals",
    buttonLink: "/deals",
    image: hero2,
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    title: "Luxury Collection",
    subtitle: "Elegant styles for every occasion",
    description: "Limited edition pieces available",
    buttonText: "View Collection",
    buttonLink: "/collection",
    image: hero3,
    bgColor: "bg-amber-50",
  },
];

const Hero = () => {
  const swiperRef = useRef(null);
  return (
    <section className="relative bg-gray-900 min-h-[80vh] flex items-center">
      <Swiper
        direction="horizontal"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          renderBullet: (index, className) => {
            return `<span class="${className} inline-block w-3 h-3 mx-2 rounded-full bg-white/50 hover:bg-white transition-all duration-300"></span>`;
          },
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full absolute inset-0"
        style={{
          "--swiper-pagination-color": "#ffffff",
          "--swiper-pagination-bullet-size": "10px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "50% 20%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 h-[80vh] flex items-center justify-center text-center px-4">
              <motion.div
                className="max-w-4xl mx-auto text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block bg-accent text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <motion.a
                  href={slide.buttonLink}
                  className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slide.buttonText}
                </motion.a>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 custom-pagination" />
      </Swiper>
    </section>
  );
};

export default Hero;
