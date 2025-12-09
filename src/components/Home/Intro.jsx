import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiCheck, FiPause, FiPlay } from "react-icons/fi";
import introVideo from "../../assets/videos/intro.mp4";

const Intro = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content will be reordered using row-start-* classes */}
          {/* Content - will be second on mobile, first on larger screens */}
          <motion.div
            className="relative lg:row-start-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-base md:text-lg font-medium text-primary/80 font-accent">
              WELCOME TO OUR WORLD
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1 md:mt-2 mb-4 md:mb-6 text-gray-900">
              Crafting Timeless Elegance
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
              Step into a world where fashion meets artistry. Our collections
              are meticulously designed to bring out the best in you, combining
              contemporary trends with timeless elegance.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <div className="shrink-0 mt-0.5 md:mt-1">
                  <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-green-400 text-white">
                    <FiCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                </div>
                <p className="ml-3 text-sm md:text-base text-gray-600">
                  Premium quality materials sourced from around the world
                </p>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 mt-0.5 md:mt-1">
                  <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-green-400 text-white">
                    <FiCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                </div>
                <p className="ml-3 text-sm md:text-base text-gray-600">
                  Ethically crafted with sustainable practices
                </p>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 mt-0.5 md:mt-1">
                  <div className="flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-green-400 text-white">
                    <FiCheck className="h-2.5 w-2.5 md:h-3 md:w-3" />
                  </div>
                </div>
                <p className="ml-3 text-sm md:text-base text-gray-600">
                  Designed to make you feel confident and empowered
                </p>
              </div>
            </div>

            <button className="w-full sm:w-auto px-6 py-2.5 md:px-8 md:py-3 bg-gray-700 text-white text-sm md:text-base font-medium rounded-md hover:bg-primary hover:scale-105 transition-all duration-300">
              Discover More
            </button>
          </motion.div>

          {/* Video - will be first on mobile, second on larger screens */}
          <motion.div
            className="relative h-[300px] md:h-[400px] w-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl row-start-1 lg:row-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              ref={videoRef}
              autoPlay={false}
              loop
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="absolute inset-0 w-full h-full object-cover object-center"
            >
              <source src={introVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/20" />
            <button
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group hover:scale-110 transition-transform duration-300"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <FiPause className="text-primary text-xl group-hover:scale-110 transition-transform" />
              ) : (
                <FiPlay className="text-primary text-xl ml-1 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
