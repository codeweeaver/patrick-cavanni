import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const NavbarLinks = ({ pageNavLinks }) => {
  return (
    <nav className=" items-center justify-center gap-5 hidden lg:flex flex-1">
      {pageNavLinks.map((item) => (
        <div key={item.name} className="group">
          <NavLink
            to={item.path}
            className={({ isActive }) => `
              px-1 inline-flex items-center text-xs font-medium leading-[62px] relative
              ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-700 hover:text-primary"
              }
            `}
          >
            <span className="whitespace-nowrap">
              {item.name}
              {item.dropdown && (
                <FiChevronDown className="ml-1 h-4 w-4 inline transition-transform duration-200 group-hover:rotate-180" />
              )}
            </span>
          </NavLink>

          {/* Dropdown Menu */}
          {item.dropdown && (
            <div
              className="
              absolute mt-0 left-0 w-full
              bg-white shadow-lg opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200 ease-out
              pointer-events-none group-hover:pointer-events-auto
              border-t border-gray-100
            "
            >
              <div className="p-8">
                <div className="flex max-h-[60vh] gap-5 overflow-hidden">
                  {/* Slider Section */}
                  <div className="w-50 max-h-80 px-2">
                    <Swiper
                      direction="vertical"
                      modules={[Autoplay, Pagination]}
                      spaceBetween={20}
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      className="h-full w-full mySwiper"
                    >
                      {item.dropdown.slides &&
                      item.dropdown.slides.length > 0 ? (
                        item.dropdown.slides.map((slide, index) => (
                          <SwiperSlide key={index} className="h-full">
                            <div className="h-full flex flex-col">
                              <div className="flex-1 bg-gray-100 rounded-lg mb-2">
                                <img
                                  src={slide.image}
                                  alt={slide.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h4 className="text-sm font-medium mt-2">
                                {slide.title}
                              </h4>
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                            <p className="text-gray-500">No slides available</p>
                          </div>
                        </SwiperSlide>
                      )}
                    </Swiper>
                  </div>

                  {/* Categories Section */}
                  <div className="w-full grid grid-cols-3 gap-8 overflow-y-auto pr-4 pl-4">
                    {/* Men's Section */}
                    {item.dropdown.men && item.dropdown.men.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                          Men
                        </h3>
                        <div className="space-y-2">
                          {item.dropdown.men.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={`${item.path}?category=men&type=${subItem.params}`}
                              className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Women's Section */}
                    {item.dropdown.women && item.dropdown.women.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                          Women
                        </h3>
                        <div className="space-y-2">
                          {item.dropdown.women.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={`${item.path}?gender=women&category=${subItem.params}`}
                              className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Brands Section */}
                    {item.dropdown.brands &&
                      item.dropdown.brands.length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                            Brands
                          </h3>
                          <div className="space-y-2">
                            {item.dropdown.brands.map((subItem) => (
                              <NavLink
                                key={subItem.name}
                                to={`${item.path}?brand=${subItem.params}`}
                                className="block text-sm text-gray-600 hover:text-primary transition-colors py-1"
                              >
                                {subItem.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavbarLinks;
